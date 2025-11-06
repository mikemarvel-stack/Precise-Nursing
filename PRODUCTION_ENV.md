# Production Environment Variables for Vercel

## Frontend Environment Variables
```
NEXT_PUBLIC_API_URL=https://precisenursingbackend.vercel.app
NEXT_PUBLIC_SITE_URL=https://precisenursing.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

## Backend Environment Variables
```
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Database (Replace with your actual Neon database URL)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Secrets (Generate using: openssl rand -base64 32)
APP_KEYS=key1,key2,key3,key4
JWT_SECRET=your_jwt_secret_32_chars
ADMIN_JWT_SECRET=your_admin_jwt_secret_32_chars
API_TOKEN_SALT=your_api_token_salt_32_chars
TRANSFER_TOKEN_SALT=your_transfer_token_salt_32_chars
ENCRYPTION_KEY=your_encryption_key_32_chars

# Payment Processing
STRIPE_SECRET_KEY=sk_test_YOUR_STRIPE_SECRET_KEY

# Email Service
EMAIL_USERNAME=writerprecise@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# URLs (Update after deployment)
FRONTEND_URL=https://precisenursing.vercel.app
BACKEND_URL=https://precisenursingbackend.vercel.app
```

## Still Need to Setup:
- Gmail App Password for EMAIL_PASSWORD
- AWS S3 for file storage (optional for initial deployment)
- PayPal credentials (optional)

## Ready to Deploy:
✅ Database configured (Neon)
✅ Security keys generated
✅ Stripe test keys ready
✅ Tawk.to chat updated