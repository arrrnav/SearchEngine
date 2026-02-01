# Deployment Guide

This guide explains how to deploy the UCI ICS Search Engine to production using the split architecture (Vercel for frontend, Render for backend).

## Architecture Overview

- **Frontend**: React + TypeScript + Tailwind CSS → Deployed on Vercel (FREE)
- **Backend**: FastAPI + Python search engine → Deployed on Render (FREE)
- **Data**: 166MB index files bundled with backend on Render

## Prerequisites

- Git repository on GitHub
- Vercel account (free)
- Render account (free)

## Backend Deployment (Render)

### Step 1: Prepare Backend

The backend is already configured with:
- `backend/Dockerfile` - Container configuration
- `backend/requirements.txt` - Python dependencies
- Environment-based paths for index files

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `uci-search-backend` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: Docker
   - **Instance Type**: Free

5. Add environment variables (optional):
   ```
   PYTHON_VERSION=3.11
   ```

6. Click "Create Web Service"

### Step 3: Wait for Build

- First build takes ~5-10 minutes (installing dependencies + copying 166MB indexes)
- Subsequent builds are faster with caching
- Check logs for "Search service ready!" message

### Step 4: Test Backend

Once deployed, test your backend:
```bash
# Replace with your Render URL
curl https://your-backend.onrender.com/health
curl "https://your-backend.onrender.com/search?q=machine+learning"
```

### Important Notes

- **Cold Starts**: Free tier has 15-minute idle timeout. First request after idle takes ~10-15 seconds to wake up
- **Index Files**: If Git repository is >500MB, use Git LFS or upload indexes separately
- **Memory**: Free tier has 512MB RAM, sufficient for this app

## Frontend Deployment (Vercel)

### Step 1: Update API URL

Edit `frontend/.env.production`:
```env
VITE_API_URL=https://your-backend.onrender.com
```

Replace with your actual Render backend URL.

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

5. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com`

6. Click "Deploy"

### Step 3: Update CORS

Once Vercel deploys, update backend CORS to include your Vercel domain:

Edit `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",
        "http://localhost:5173"  # Keep for local dev
    ],
    # ... rest of config
)
```

Commit and push. Render will auto-deploy.

### Step 4: Test Full Stack

Visit your Vercel URL and test:
1. Search functionality
2. Search history persistence
3. Dark mode toggle
4. Boolean AND queries

## Custom Domain (Optional)

### Vercel (Frontend)

1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `search.yourdomain.com`)
3. Follow DNS configuration instructions

### Render (Backend)

1. Go to Service → Settings → Custom Domain
2. Add subdomain (e.g., `api.yourdomain.com`)
3. Update frontend `.env.production` with new API URL

## Monitoring & Maintenance

### Check Backend Health

Set up monitoring with UptimeRobot or similar:
- **URL**: `https://your-backend.onrender.com/health`
- **Interval**: Every 5 minutes
- Prevents cold starts during peak hours

### View Logs

- **Render**: Dashboard → Logs tab
- **Vercel**: Project → Deployments → View Logs

### Update Search Index

To rebuild indexes:
1. Run `python indexer.py` and `python merger.py` locally
2. Commit updated index files
3. Push to GitHub
4. Render auto-deploys with new indexes

## Troubleshooting

### Backend Won't Start

Check Render logs for:
- Missing dependencies: Verify `requirements.txt`
- Missing index files: Check if all files committed
- Out of memory: Free tier has 512MB limit

### Frontend Can't Connect to Backend

1. Verify `VITE_API_URL` environment variable
2. Check browser console for CORS errors
3. Verify backend is running: `curl https://your-backend.onrender.com/health`

### Slow First Request

This is normal for Render free tier:
- Cold start after 15 minutes of inactivity
- Solution: Use UptimeRobot to ping every 5-10 minutes

## Cost Summary

- **Vercel Frontend**: $0/month (Free tier - 100GB bandwidth)
- **Render Backend**: $0/month (Free tier - 750 hours/month)
- **Custom Domain** (optional): ~$12/year
- **Total**: $0-1/month

## Production Checklist

- [ ] Backend deployed and responding to /health
- [ ] Backend /search endpoint returns results
- [ ] Frontend deployed on Vercel
- [ ] Frontend connects to backend successfully
- [ ] Search functionality works end-to-end
- [ ] CORS configured for production domain
- [ ] Search history persists in localStorage
- [ ] Dark mode works and persists
- [ ] Boolean AND queries work
- [ ] Mobile responsive design tested
- [ ] Environment variables set correctly
- [ ] Monitoring set up (optional but recommended)
