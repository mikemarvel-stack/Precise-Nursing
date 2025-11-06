# Alternative Valid Project Names for Vercel

If you're getting "invalid characters" errors, try these alternatives:

## Frontend Options:
- ✅ `precisenursing` (recommended)
- ✅ `precise_nursing`
- ✅ `precisenursingapp`

## Backend Options:
- ✅ `precisenursing_backend` (recommended)
- ✅ `precisenursingapi`
- ✅ `precisenursing_api`
- ✅ `pnbackend`
- ✅ `precisenursingserver`

## Quick Fix:
If still getting errors, use the simplest names:
- **Frontend**: `precisenursing`
- **Backend**: `pnbackend`

The URLs will be:
- Frontend: `https://precisenursing.vercel.app`
- Backend: `https://pnbackend.vercel.app`

## Update Environment Variables:
After deployment, update your environment variables:

**Frontend (.env.local)**:
```
NEXT_PUBLIC_API_URL=https://pnbackend.vercel.app
```

**Backend (.env)**:
```
FRONTEND_URL=https://precisenursing.vercel.app
```