# Quick Start Guide - Railway Deployment

## Deploy to Railway in 5 Minutes

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create Railway Project
1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select `errands-portfolio-showcase`

### 3. Add Database
1. Click **"+ New"** → **"Database"** → **"PostgreSQL"**
2. Wait for database to provision

### 4. Configure Backend Service
1. Click on your repo service
2. Rename to **"backend"**
3. Go to **"Variables"** tab:
   - Add reference to PostgreSQL `DATABASE_URL`
   - Add `NODE_ENV=production`
   - Add `PORT=3001`
4. Go to **"Settings"** → **"Deploy"**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Deploy"**

### 5. Deploy Frontend (Option A - Separate Service)
1. Click **"+ New"** → **"GitHub Repo"** → Select same repo
2. Rename to **"frontend"**
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.up.railway.app/api
   ```
   (Replace with your actual backend URL from step 4)
4. **Build Command**: `npm install && npm run build`
5. **Start Command**: `npx serve -s dist -l 8080`

### 5. Deploy Frontend (Option B - Same Service)
Skip separate frontend service. Backend will serve frontend from `/dist`:
1. Build locally: `npm run build`
2. Commit dist folder: `git add dist && git commit -m "Add build"`
3. Push: `git push`
4. Backend will automatically serve frontend

### 6. Seed Database
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Run seed
railway run npm run seed
```

### 7. Done! 🎉
Your app is live at:
- Frontend: `https://frontend.up.railway.app`
- Backend: `https://backend.up.railway.app/api`

## Recommended: 2-Service Setup (Simpler)

For easier management, use just 2 services:

**Service 1: PostgreSQL Database**
- Managed by Railway
- Automatic backups

**Service 2: Backend + Frontend**
- Backend serves API at `/api/*`
- Backend serves frontend at `/*`
- Single deployment, single URL
- Less configuration needed

## Environment Variables Cheat Sheet

### Backend Service
```env
DATABASE_URL=postgresql://...  # Auto-set by Railway
NODE_ENV=production
PORT=3001
```

### Frontend Service (if separate)
```env
VITE_API_URL=https://your-backend.up.railway.app/api
NODE_ENV=production
```

## Troubleshooting

### Database not connecting?
- Check that `DATABASE_URL` is linked in backend service
- View backend logs: Click service → "Deployments" → "View Logs"

### Frontend can't reach API?
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Test API directly: `https://your-backend.up.railway.app/api/health`

### Need help?
- Full guide: See `RAILWAY_DEPLOYMENT.md`
- Railway docs: https://docs.railway.app
- Discord: https://discord.gg/railway
