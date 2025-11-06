#!/bin/bash

# PreciseNursing Domain Migration Script
set -e

echo "🔄 Migrating PreciseNursing to existing domain..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root (use sudo)"
    exit 1
fi

# Backup existing site
echo "📦 Creating backup of existing site..."
BACKUP_DIR="/var/backups/precisenursing-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR

# Backup existing nginx config
if [ -f "/etc/nginx/sites-available/precisenursing.com" ]; then
    cp /etc/nginx/sites-available/precisenursing.com $BACKUP_DIR/
fi

# Backup existing SSL certificates
if [ -d "/etc/letsencrypt/live/precisenursing.com" ]; then
    cp -r /etc/letsencrypt/live/precisenursing.com $BACKUP_DIR/
fi

echo "✅ Backup created at: $BACKUP_DIR"

# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing nginx..."
    apt update
    apt install -y nginx
fi

# Create nginx directories if they don't exist
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled

# Stop existing services
echo "🛑 Stopping existing services..."
systemctl stop nginx || true
docker-compose down || true

# Update nginx main config with rate limiting
echo "🔧 Updating nginx configuration..."
cat > /etc/nginx/conf.d/rate-limit.conf << 'EOF'
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
EOF

cat > /etc/nginx/sites-available/precisenursing.com << 'EOF'
server {
    listen 80;
    server_name precisenursing.com www.precisenursing.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name precisenursing.com www.precisenursing.com;

    ssl_certificate /etc/letsencrypt/live/precisenursing.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/precisenursing.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        
        proxy_pass http://127.0.0.1:1337/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Strapi Admin
    location /admin/ {
        proxy_pass http://127.0.0.1:1337/admin/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # File uploads
    location /uploads/ {
        proxy_pass http://127.0.0.1:1337/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    client_max_body_size 50M;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/precisenursing.com /etc/nginx/sites-enabled/
nginx -t

# Set up environment variables
echo "⚙️ Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.production .env
    echo "DOMAIN=precisenursing.com" >> .env
    echo "FRONTEND_URL=https://precisenursing.com" >> .env
    echo "NEXT_PUBLIC_API_URL=https://precisenursing.com/api" >> .env
fi

# Install dependencies and build
echo "📦 Installing dependencies..."
cd frontend && npm install && npm run build && cd ..
cd backend && npm install && cd ..

# Start services with PM2 for production
echo "🚀 Starting services..."
npm install -g pm2

# Start backend
cd backend
pm2 start npm --name "precisenursing-backend" -- start
cd ..

# Start frontend
cd frontend
pm2 start npm --name "precisenursing-frontend" -- start
cd ..

# Start nginx
systemctl start nginx
systemctl enable nginx

# Set up PM2 to start on boot
pm2 startup
pm2 save

# Test SSL certificate renewal
echo "🔒 Testing SSL certificate..."
certbot renew --dry-run

# Set up automatic renewals
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -

# Final health checks
echo "🔍 Running health checks..."
sleep 10

if curl -f -s https://precisenursing.com/api/health > /dev/null; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
fi

if curl -f -s https://precisenursing.com > /dev/null; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
fi

echo "🎉 Domain migration completed!"
echo ""
echo "Your PreciseNursing platform is now running at: https://precisenursing.com"
echo ""
echo "Management commands:"
echo "- View logs: pm2 logs"
echo "- Restart services: pm2 restart all"
echo "- Stop services: pm2 stop all"
echo "- Check status: pm2 status"
echo ""
echo "Next steps:"
echo "1. Visit https://precisenursing.com/admin to access Strapi admin"
echo "2. Configure your payment settings"
echo "3. Add your academic content"
echo "4. Test the ordering system"