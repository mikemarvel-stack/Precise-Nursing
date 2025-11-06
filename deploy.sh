#!/bin/bash

# PreciseNursing Production Deployment Script
set -e

echo "🚀 Starting PreciseNursing deployment..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root (use sudo)"
    exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Docker and Docker Compose if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    usermod -aG docker $SUDO_USER
fi

if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Install Certbot for SSL
if ! command -v certbot &> /dev/null; then
    echo "🔒 Installing Certbot..."
    apt install -y certbot python3-certbot-nginx
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p /var/www/certbot
mkdir -p ./nginx/ssl
mkdir -p ./backups/db

# Set up environment variables
if [ ! -f .env ]; then
    echo "⚙️ Setting up environment variables..."
    cp .env.production .env
    echo "Please edit .env file with your actual values before continuing."
    echo "Press Enter when ready..."
    read
fi

# Generate SSL certificates
echo "🔒 Setting up SSL certificates..."
read -p "Enter your domain name: " DOMAIN
read -p "Enter your email for SSL certificates: " EMAIL

# Initial certificate generation
certbot certonly --webroot -w /var/www/certbot -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --no-eff-email

# Build and start services
echo "🏗️ Building and starting services..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Run database migrations
echo "🗄️ Running database setup..."
docker-compose -f docker-compose.prod.yml exec backend npm run strapi build

# Set up automatic backups
echo "💾 Setting up automatic backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * cd $(pwd) && docker-compose -f docker-compose.prod.yml exec backend npm run backup") | crontab -

# Set up SSL renewal
echo "🔄 Setting up SSL auto-renewal..."
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && docker-compose -f docker-compose.prod.yml restart nginx") | crontab -

# Configure firewall
echo "🔥 Configuring firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 443

# Final checks
echo "🔍 Running health checks..."
sleep 10

if curl -f -s https://$DOMAIN/api/health > /dev/null; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
fi

if curl -f -s https://$DOMAIN > /dev/null; then
    echo "✅ Frontend is healthy"
else
    echo "❌ Frontend health check failed"
fi

echo "🎉 Deployment completed!"
echo "Your PreciseNursing platform is now running at: https://$DOMAIN"
echo ""
echo "Next steps:"
echo "1. Visit https://$DOMAIN/admin to set up your admin account"
echo "2. Configure your payment providers in the admin panel"
echo "3. Set up your AWS S3 buckets for file storage and backups"
echo "4. Test the payment integration"
echo ""
echo "Monitoring:"
echo "- View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "- Check status: docker-compose -f docker-compose.prod.yml ps"
echo "- Manual backup: docker-compose -f docker-compose.prod.yml exec backend npm run backup"