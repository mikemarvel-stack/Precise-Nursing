# Vercel Deployment Guide

## Frontend Deployment
1. Go to https://vercel.com/new
2. Import `mikemarvel-stack/Precise-Nursing`
3. Configure:
   - Framework: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Backend Deployment
1. Deploy backend separately to https://vercel.com/new
2. Import same repository
3. Configure:
   - Framework: Other
   - Root Directory: `backend`
   - Build Command: `npm run vercel-build`

## Environment Variables

### Frontend (.env.production)
```
NEXT_PUBLIC_API_URL=https://precisenursing-backend.vercel.app
NEXT_PUBLIC_SITE_URL=https://precisenursing.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

### Backend (.env.production)
```
DATABASE_URL=postgresql://user:pass@host:port/db
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_secret
JWT_SECRET=your_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_salt
ENCRYPTION_KEY=your_encryption_key
```

## Features Included
✅ Next.js frontend with all pages
✅ Strapi CMS backend
✅ Payment processing (Stripe/PayPal)
✅ File uploads and downloads
✅ Admin dashboard
✅ Plugin system
✅ SEO optimization
✅ Tawk.to chat integration
✅ Custom order system
✅ User authentication
✅ Document marketplace

## URLs After Deployment
- Frontend: https://precisenursing.vercel.app
- Backend: https://precisenursing-backend.vercel.app
- Admin: https://precisenursing.vercel.app/admin-access