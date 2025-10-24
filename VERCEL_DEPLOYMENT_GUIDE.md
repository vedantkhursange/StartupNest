# StartupNest - Vercel Deployment Guide

## Complete Production-Ready Setup

This guide will help you deploy StartupNest to Vercel with all features working perfectly.

## Prerequisites

- GitHub account with your repository
- Vercel account
- Gemini API key
- MongoDB Atlas account (for production database)
- Backend server deployed (Heroku, Railway, or similar)

## Step 1: Prepare Your Repository

\`\`\`bash
# Make sure all changes are committed
git add .
git commit -m "Production ready: Gemini chatbot, responsive design, debouncing"
git push origin main
\`\`\`

## Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select the root directory (where `package.json` is)
5. Click "Deploy"

### Option B: Using Vercel CLI

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Add the following variables:

\`\`\`
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_API_URL=https://your-backend-url.com
\`\`\`

## Step 4: Deploy Backend

### Option A: Deploy to Heroku

\`\`\`bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
\`\`\`

### Option B: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Add MongoDB plugin
5. Set environment variables
6. Deploy

## Step 5: Update API URLs

After deploying backend, update the API URLs in your frontend:

1. In Vercel Environment Variables, add:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-url.com
\`\`\`

2. Update all API calls in the code to use this variable:

\`\`\`typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

// Usage
fetch(`${API_URL}/api/user/login`, ...)
\`\`\`

## Step 6: Verify Deployment

1. Visit your Vercel deployment URL
2. Test all features:
   - Login/Signup
   - Search with debouncing
   - Pagination
   - Sorting
   - Chatbot
   - Mobile responsiveness

## Step 7: Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Performance Optimization

### Enable Caching

In `next.config.js`:

\`\`\`javascript
module.exports = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=120',
          },
        ],
      },
    ]
  },
}
\`\`\`

### Image Optimization

Vercel automatically optimizes images. Ensure you're using Next.js Image component:

\`\`\`typescript
import Image from 'next/image'

<Image src="/image.png" alt="description" width={400} height={300} />
\`\`\`

## Monitoring

### Vercel Analytics

1. Go to Analytics in Vercel Dashboard
2. Monitor:
   - Page load times
   - Core Web Vitals
   - Error rates

### Error Tracking

Set up error tracking with Sentry:

\`\`\`bash
npm install @sentry/nextjs
\`\`\`

## Security Checklist

- [ ] API keys are in environment variables
- [ ] CORS is properly configured
- [ ] Authentication tokens are secure
- [ ] Database credentials are protected
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] HTTPS is enabled
- [ ] Security headers are set

## Troubleshooting

### Build Fails

\`\`\`bash
# Clear cache and rebuild
vercel --prod --force
\`\`\`

### API Connection Issues

1. Check backend is running
2. Verify API URL in environment variables
3. Check CORS settings on backend
4. Review browser console for errors

### Chatbot Not Working

1. Verify Gemini API key is set
2. Check API quota in Google Cloud Console
3. Review `/api/chat` endpoint logs

### Mobile Issues

1. Test on actual devices
2. Use Chrome DevTools device emulation
3. Check viewport meta tag in layout
4. Verify responsive classes are applied

## Rollback

If something goes wrong:

\`\`\`bash
# Revert to previous deployment
vercel rollback
\`\`\`

## Continuous Deployment

Vercel automatically deploys on every push to main branch. To disable:

1. Settings → Git → Automatic Deployments
2. Toggle off

## Database Backup

For MongoDB Atlas:

1. Go to Atlas Dashboard
2. Backup → Create Backup
3. Schedule automatic backups

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Gemini API: https://ai.google.dev/docs
