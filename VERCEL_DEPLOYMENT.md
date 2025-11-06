# Vercel Deployment Guide

## Valid Project Names for Vercel

When creating projects on Vercel, use these names (no hyphens allowed):

### Frontend Project
- **Name**: `precisenursing`
- **Repository**: Connect your GitHub repo `Precise-Nursing`
- **Root Directory**: `frontend`

### Backend Project  
- **Name**: `precisenursingbackend`
- **Repository**: Connect your GitHub repo `Precise-Nursing`
- **Root Directory**: `backend`

## Step-by-Step Deployment

### 1. Deploy Frontend
```bash
# In Vercel dashboard:
1. New Project → Import Git Repository
2. Select: Precise-Nursing repository
3. Project Name: precisenursing
4. Root Directory: frontend
5. Framework Preset: Next.js
6. Add Environment Variables:
   - NEXT_PUBLIC_API_URL=https://precisenursingbackend.vercel.app
   - NEXT_PUBLIC_SITE_URL=https://precisenursing.vercel.app
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
7. Deploy
```

### 2. Deploy Backend
```bash
# In Vercel dashboard:
1. New Project → Import Git Repository  
2. Select: Precise-Nursing repository
3. Project Name: precisenursingbackend
4. Root Directory: backend
5. Framework Preset: Other
6. Add Environment Variables (see PRODUCTION_ENV.md)
7. Deploy
```

### 3. Update Environment Variables
After both deployments, update the URLs:

**Frontend Environment Variables:**
- `NEXT_PUBLIC_API_URL` = `https://precisenursingbackend.vercel.app`

**Backend Environment Variables:**
- `FRONTEND_URL` = `https://precisenursing.vercel.app`

## Common Issues

### Invalid Project Name Error
- ❌ `precise-nursing` (contains hyphen)
- ❌ `123precisenursing` (starts with digit)
- ✅ `precisenursing` (valid)
- ✅ `precisenursing_backend` (valid with underscore)

### Build Errors
- Ensure correct root directory is selected
- Check that package.json exists in the root directory
- Verify all environment variables are set

### CORS Issues
- Make sure FRONTEND_URL in backend matches your actual frontend URL
- Check that API calls use the correct backend URL