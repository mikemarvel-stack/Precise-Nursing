# PreciseNursing - Healthcare Management Platform

A modern, extensible healthcare management platform with plugin system, payment integration, and production-ready features.

## 🚀 Features

### Frontend
- **Modern React/Next.js 15** with TypeScript
- **Plugin System** - Install extensions directly from web stores
- **Modern UI Components** - Radix UI with Tailwind CSS
- **State Management** - Zustand for efficient state handling
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Built-in theme switching

### Backend
- **Strapi 4.25** - Headless CMS with TypeScript
- **Payment Integration** - Stripe & PayPal support
- **Auto Backups** - Scheduled S3 backups with retention
- **SSL/Security** - Production-ready security headers
- **API Documentation** - Auto-generated OpenAPI docs
- **GraphQL Support** - Alternative to REST API

### Production Features
- **Docker Containerization** - Easy deployment
- **Nginx Reverse Proxy** - Load balancing and SSL termination
- **Let's Encrypt SSL** - Automatic certificate management
- **Rate Limiting** - API protection
- **Health Monitoring** - Service health checks
- **Automated Deployment** - One-command production setup

## 🛠 Quick Start

### Development Setup

1. **Clone and Install**
```bash
git clone <repository>
cd precisenursing
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
npm install
npm run develop
```

4. **Docker Development**
```bash
docker-compose up --build
```

### Production Deployment

1. **Automated Deployment**
```bash
sudo ./deploy.sh
```

2. **Manual Setup**
```bash
# Copy environment variables
cp .env.production .env
# Edit .env with your values

# Deploy with Docker
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret

# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
PAYPAL_CLIENT_ID=your-paypal-client-id

# AWS
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET=your-s3-bucket
AWS_BACKUP_BUCKET=your-backup-bucket
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## 📦 Plugin System

### Installing Plugins

1. **Via Dashboard**
   - Navigate to Plugin Manager
   - Browse available plugins
   - Click "Install" on desired plugins

2. **Via API**
```javascript
const response = await fetch('/api/plugins/install', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pluginId: 'plugin-name' })
})
```

### Creating Custom Plugins

1. **Plugin Structure**
```
my-plugin/
├── manifest.json
├── index.js
├── components/
└── styles/
```

2. **Manifest Example**
```json
{
  "manifest_version": 1,
  "name": "My Plugin",
  "version": "1.0.0",
  "description": "Plugin description",
  "permissions": ["read-data", "write-data"],
  "main": "index.js"
}
```

## 💳 Payment Integration

### Stripe Setup

1. **Configure Webhook**
   - Endpoint: `https://yourdomain.com/api/payments/stripe/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

2. **Test Payment**
```javascript
const response = await fetch('/api/payments/stripe/create-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 29.99, currency: 'usd' })
})
```

### PayPal Setup

1. **Configure App**
   - Create PayPal app in developer console
   - Set return URL: `https://yourdomain.com/payment/success`

## 🔒 Security Features

- **SSL/TLS Encryption** - Let's Encrypt certificates
- **Rate Limiting** - API endpoint protection
- **CORS Configuration** - Cross-origin request security
- **Security Headers** - XSS, CSRF protection
- **Input Validation** - Zod schema validation
- **Authentication** - JWT-based auth system

## 📊 Monitoring & Backups

### Automated Backups
- **Schedule**: Daily at 2 AM
- **Storage**: AWS S3 with encryption
- **Retention**: 30 days (configurable)
- **Includes**: Database + uploaded files

### Health Monitoring
```bash
# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Manual backup
docker-compose -f docker-compose.prod.yml exec backend npm run backup
```

## 🚀 Scaling

### Horizontal Scaling
```yaml
# docker-compose.prod.yml
backend:
  deploy:
    replicas: 3
  
frontend:
  deploy:
    replicas: 2
```

### Database Optimization
- Connection pooling configured
- Read replicas support
- Query optimization tools

## 📚 API Documentation

- **REST API**: `https://yourdomain.com/documentation`
- **GraphQL**: `https://yourdomain.com/graphql`
- **Admin Panel**: `https://yourdomain.com/admin`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.precisenursing.com](https://docs.precisenursing.com)
- **Issues**: [GitHub Issues](https://github.com/precisenursing/issues)
- **Email**: support@precisenursing.com

---

Built with ❤️ for healthcare professionals# Precise-Nursing
