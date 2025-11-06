# Required Variables for Precise Nursing Website

## Frontend Environment Variables (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-frontend-url.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

## Backend Environment Variables (.env)
```
# Database (Required - PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database_name

# Strapi Secrets (Required - Generate random strings)
APP_KEYS=random_key_1,random_key_2,random_key_3,random_key_4
JWT_SECRET=your_jwt_secret_minimum_32_characters
ADMIN_JWT_SECRET=your_admin_jwt_secret_minimum_32_characters
API_TOKEN_SALT=your_api_token_salt_minimum_32_characters
TRANSFER_TOKEN_SALT=your_transfer_token_salt_minimum_32_characters

# Payment Processing (Required)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret

# Email Service (Required for notifications)
EMAIL_PROVIDER=smtp
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Storage (Required for document uploads)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your_s3_bucket_name

# URLs (Required)
FRONTEND_URL=https://your-frontend-url.vercel.app
BACKEND_URL=https://your-backend-url.vercel.app

# Optional but Recommended
NODE_ENV=production
HOST=0.0.0.0
PORT=1337
```

## Third-Party Services Required

### 1. Database
- **PostgreSQL Database** (Vercel Postgres, Railway, or AWS RDS)
- Connection string format: `postgresql://username:password@host:port/database`

### 2. Payment Processing
- **Stripe Account** (stripe.com)
  - Get publishable key (pk_live_...)
  - Get secret key (sk_live_...)
- **PayPal Developer Account** (developer.paypal.com)
  - Get client ID and secret

### 3. File Storage
- **AWS S3 Bucket** for document storage
  - Create IAM user with S3 permissions
  - Get access key and secret key

### 4. Email Service
- **Gmail App Password** or **SendGrid API Key**
  - For order confirmations and notifications

### 5. Domain & SSL
- **Custom Domain** (optional but recommended)
- **SSL Certificate** (automatic with Vercel)

## Security Keys Generation
Generate random strings for secrets using:
```bash
# Generate 32-character random string
openssl rand -base64 32

# Or use online generator
# https://generate-random.org/api-key-generator
```

## Tawk.to Chat Widget
- **Tawk.to Account** (tawk.to)
- Get widget ID from dashboard
- Already integrated in layout.tsx

## Google Services (Optional)
- **Google Analytics** tracking ID
- **Google Search Console** verification
- **Google Site Verification** code

## Development vs Production
- Use `_test_` keys for development
- Use `_live_` keys for production
- Never commit real keys to git
- Use environment variables in deployment platforms