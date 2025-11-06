# Step-by-Step Guide to Get Required Variables

## 1. Database Setup (PostgreSQL)

### Option A: Vercel Postgres (Recommended)
1. Go to [vercel.com](https://vercel.com) → Dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Name: `precisenursing-db`
4. Copy the connection string: `DATABASE_URL=postgresql://...`

### Option B: Railway
1. Go to [railway.app](https://railway.app) → New Project
2. Add PostgreSQL service
3. Copy connection string from Variables tab

## 2. Payment Processing

### Stripe Setup
1. Go to [stripe.com](https://stripe.com) → Create account
2. Dashboard → Developers → API Keys
3. Copy:
   - **Publishable key**: `pk_test_...` (for frontend)
   - **Secret key**: `sk_test_...` (for backend)
4. For production: Switch to live mode, get `pk_live_...` and `sk_live_...`

### PayPal Setup
1. Go to [developer.paypal.com](https://developer.paypal.com)
2. Create App → Get credentials:
   - **Client ID**: `your_client_id`
   - **Client Secret**: `your_client_secret`

## 3. File Storage (AWS S3)

### Create S3 Bucket
1. Go to [AWS Console](https://console.aws.amazon.com) → S3
2. Create bucket: `precisenursing-documents`
3. Set permissions: Public read access for downloads

### Create IAM User
1. AWS Console → IAM → Users → Create user
2. Username: `precisenursing-s3-user`
3. Attach policy: `AmazonS3FullAccess`
4. Create access key → Copy:
   - **Access Key ID**: `AKIA...`
   - **Secret Access Key**: `...`

## 4. Email Service

### Gmail App Password
1. Gmail → Account Settings → Security
2. Enable 2-Factor Authentication
3. Generate App Password:
   - **EMAIL_USERNAME**: `your_email@gmail.com`
   - **EMAIL_PASSWORD**: `16-character app password`

### Alternative: SendGrid
1. Go to [sendgrid.com](https://sendgrid.com) → Create account
2. Settings → API Keys → Create API Key
3. Copy API key for `EMAIL_API_KEY`

## 5. Generate Security Keys

### Using Terminal/Command Line
```bash
# Generate JWT secrets (run 5 times for different keys)
openssl rand -base64 32

# Results will look like:
# APP_KEYS=abc123,def456,ghi789,jkl012
# JWT_SECRET=your_32_char_secret_here
# ADMIN_JWT_SECRET=another_32_char_secret
# API_TOKEN_SALT=api_salt_32_chars
# TRANSFER_TOKEN_SALT=transfer_salt_32_chars
```

### Using Online Generator
1. Go to [generate-random.org/api-key-generator](https://generate-random.org/api-key-generator)
2. Generate 5 different 32-character keys
3. Use for each secret variable

## 6. Tawk.to Chat (Already Setup)
Current widget ID: `673b5b2e2480f5b4f59f4e5a`
- To change: Go to [tawk.to](https://tawk.to) → Admin → Chat Widget → Copy new ID

## 7. Domain Setup (Optional)

### Custom Domain
1. Buy domain from Namecheap, GoDaddy, etc.
2. In Vercel: Project Settings → Domains → Add domain
3. Update DNS records as instructed

## 8. Environment Variables Setup

### For Vercel Deployment
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://...`
   - **Environment**: Production, Preview, Development

### Example Complete Setup
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://precisenursing-backend.vercel.app
NEXT_PUBLIC_SITE_URL=https://precisenursing.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...

# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:5432/db
APP_KEYS=key1,key2,key3,key4
JWT_SECRET=supersecretjwtkey32characterslong
ADMIN_JWT_SECRET=adminsecretshouldbe32charslong
API_TOKEN_SALT=apisaltmustbe32characterslong
TRANSFER_TOKEN_SALT=transfersalt32characterslong
STRIPE_SECRET_KEY=sk_test_51ABC123...
PAYPAL_CLIENT_ID=AYourPayPalClientID
PAYPAL_CLIENT_SECRET=EYourPayPalSecret
EMAIL_USERNAME=writerprecise@gmail.com
EMAIL_PASSWORD=your16charapppassword
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=precisenursing-documents
FRONTEND_URL=https://precisenursing.vercel.app
BACKEND_URL=https://precisenursing-backend.vercel.app
```

## 9. Testing Variables
1. Deploy to Vercel with test keys first
2. Test payments with Stripe test cards
3. Test file uploads to S3
4. Test email notifications
5. Switch to live keys for production

## 10. Security Checklist
- ✅ Never commit `.env` files to git
- ✅ Use different keys for development/production
- ✅ Rotate keys regularly
- ✅ Monitor usage in service dashboards
- ✅ Set up billing alerts for AWS/Stripe