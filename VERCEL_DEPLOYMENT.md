# Vercel Deployment Guide

Deploy TitanSaga Admin Panel to Vercel.

## Prerequisites

- Vercel account (free tier works)
- GitHub repository (recommended) or Vercel CLI
- World Engine Server deployed and accessible

## Quick Deploy

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   cd TitanSaga-Admin
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the Vite framework using `vercel.json`

3. **Configure Environment Variables**

   In Vercel project settings, add these environment variables:

   ```env
   VITE_API_BASE_URL=https://your-production-api.com
   VITE_API_V1_PREFIX=/api/v1
   VITE_ENV=production
   VITE_DEBUG=false
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get your live URL: `https://your-app.vercel.app`

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd TitanSaga-Admin
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_API_BASE_URL production
   vercel env add VITE_API_V1_PREFIX production
   vercel env add VITE_ENV production
   vercel env add VITE_DEBUG production
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Configuration Files

### `vercel.json`

Already configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing rewrites

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Your backend API URL | `https://api.titansaga.com` |
| `VITE_API_V1_PREFIX` | API version prefix | `/api/v1` |
| `VITE_ENV` | Environment name | `production` |
| `VITE_DEBUG` | Enable debug logging | `false` |

### Setting Variables in Vercel Dashboard

1. Go to your project in Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `VITE_API_BASE_URL`
   - Value: Your production API URL
   - Environment: Production (and Preview if needed)
4. Click "Save"
5. Redeploy for changes to take effect

## Post-Deployment

### 1. Update CORS on Backend

Add your Vercel URL to the backend CORS origins:

```env
# World-Engine-Server/.env
CORS_ORIGINS=https://your-app.vercel.app,https://your-app-preview.vercel.app
```

Restart your backend server after updating.

### 2. Test the Deployment

1. **Check Health**: Visit `https://your-app.vercel.app`
2. **Test Login**: Use admin credentials (admin/admin123)
3. **Verify API Connection**: Check browser console for errors
4. **Test All Pages**: Navigate through all dashboard sections

### 3. Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records as shown
4. Update `CORS_ORIGINS` on backend with new domain

## Automatic Deployments

Every push to your main branch will automatically:
1. Trigger a new build
2. Run tests (if configured)
3. Deploy to production
4. Update your live site

## Preview Deployments

Every pull request gets a unique preview URL:
- Separate environment variables
- Test before merging
- Automatic cleanup when PR closes

## Troubleshooting

### Build Fails

**Check build logs** in Vercel dashboard:
- TypeScript errors
- Missing dependencies
- Environment variable issues

**Common fixes:**
```bash
# Locally test production build
npm run build
npm run preview
```

### 404 Errors on Refresh

**Cause**: Missing SPA routing configuration

**Fix**: The `vercel.json` rewrites should handle this. If not working:
1. Verify `vercel.json` is in root directory
2. Check the rewrite rules are correct
3. Redeploy

### API Connection Failed

**Causes:**
- Wrong `VITE_API_BASE_URL`
- Backend not allowing CORS from Vercel domain
- Backend not deployed or accessible

**Fix:**
1. Check environment variables in Vercel dashboard
2. Test API URL manually: `curl https://your-api.com/health`
3. Verify CORS configuration on backend
4. Check browser console for specific error

### Environment Variables Not Working

**Cause**: Vite requires `VITE_` prefix for environment variables

**Fix:**
- All variables must start with `VITE_`
- Redeploy after adding/changing variables
- Check build logs to verify variables are loaded

## Development vs Production

### Development (Local)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_DEBUG=true
```

### Production (Vercel)
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_DEBUG=false
```

## Security Checklist

- [ ] `VITE_DEBUG=false` in production
- [ ] API uses HTTPS
- [ ] CORS properly configured on backend
- [ ] No sensitive data in environment variables
- [ ] Token stored securely (localStorage for now)
- [ ] Backend validates all requests

## Performance Optimization

Vercel automatically provides:
- Edge caching
- Automatic compression (gzip/brotli)
- Image optimization
- Global CDN distribution

## Monitoring

### Vercel Analytics

Enable in project settings:
- Page views
- Performance metrics
- User analytics

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Custom logging to backend

## Costs

**Free Tier includes:**
- 100 GB bandwidth
- Unlimited deployments
- Preview deployments
- Custom domains
- SSL certificates

Perfect for development and small-scale production!

## Next Steps

After deployment:

1. [ ] Test all functionality on live site
2. [ ] Configure custom domain (optional)
3. [ ] Set up monitoring/analytics
4. [ ] Update documentation with live URLs
5. [ ] Share admin panel URL with team

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html#vercel
- **Issues**: Check Vercel build logs and browser console

---

**Status**: Ready to deploy! 🚀

**Live URL**: Will be generated after first deployment
