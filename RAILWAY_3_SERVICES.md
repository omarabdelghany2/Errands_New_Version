# Railway 3-Service Deployment Guide

## Architecture: Frontend + Backend + Database (3 Separate Services)

```
┌──────────────────────────────────────┐
│  SERVICE 1: Frontend (Vite Static)  │
│  Port: 8080                          │
│  URL: frontend-xxx.up.railway.app   │
└──────────────┬───────────────────────┘
               │
               │ API Calls
               ▼
┌──────────────────────────────────────┐
│  SERVICE 2: Backend (Express.js)     │
│  Port: 3001                          │
│  URL: backend-xxx.up.railway.app    │
└──────────────┬───────────────────────┘
               │
               │ SQL Queries
               ▼
┌──────────────────────────────────────┐
│  SERVICE 3: PostgreSQL Database      │
│  Managed by Railway                  │
└──────────────────────────────────────┘
```

## Step-by-Step Deployment

### STEP 1: Create Railway Project

1. Go to **https://railway.app/new**
2. Sign in with your GitHub account
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: **`omarabdelghany2/Errands_New_Version`**

Railway will create the first service automatically. We'll configure it in the next steps.

---

### STEP 2: Add PostgreSQL Database Service

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will provision the database (takes ~30 seconds)

✅ **Service 1 Created: PostgreSQL Database**

**Note:** Railway automatically sets these variables:
- `DATABASE_URL`
- `PGHOST`
- `PGPORT`
- `PGUSER`
- `PGPASSWORD`
- `PGDATABASE`

---

### STEP 3: Configure Backend Service

The first service created from your repo will be the backend.

#### A. Rename the Service
1. Click on the service created in Step 1
2. Go to **"Settings"** tab
3. Under **"Service Name"**, rename it to: **`backend`**

#### B. Configure Build & Start Commands
1. Stay in **"Settings"** tab
2. Scroll to **"Build & Deploy"** section
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Watch Paths**: Leave default or set to `/server/**`

#### C. Set Environment Variables
1. Click on the **"Variables"** tab
2. Add these variables by clicking **"+ New Variable"**:

   ```
   NODE_ENV=production
   PORT=3001
   ```

#### D. Link to Database
1. Still in **"Variables"** tab
2. Click **"+ New Variable"** → **"Add Reference"**
3. Select your **PostgreSQL** service
4. Choose **`DATABASE_URL`** from the dropdown
5. Click **"Add"**

✅ **Service 2 Configured: Backend**

#### E. Generate Domain
1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `backend-production-xxxx.up.railway.app`)
5. **SAVE THIS URL** - you'll need it for the frontend!

#### F. Deploy
1. Click **"Deploy"** or wait for auto-deploy
2. Check **"Deployments"** tab to monitor progress
3. Wait until you see **"Success"** status

---

### STEP 4: Add Frontend Service

Now we'll add the frontend as a completely separate service.

#### A. Create New Service from Same Repo
1. Click **"+ New"** in your Railway project
2. Select **"GitHub Repo"**
3. Choose **`omarabdelghany2/Errands_New_Version`** (same repo)
4. Railway will create a second service

#### B. Rename to Frontend
1. Click on the new service
2. Go to **"Settings"** tab
3. Under **"Service Name"**, rename it to: **`frontend`**

#### C. Configure Build Commands for Frontend
1. Stay in **"Settings"** tab
2. Scroll to **"Build & Deploy"** section
3. Set these commands:
   - **Build Command**:
     ```
     npm install && npm run build
     ```
   - **Start Command**:
     ```
     npx serve -s dist -l 8080
     ```
   - **Watch Paths**: Set to `/src/**`

#### D. Set Frontend Environment Variables
1. Click on **"Variables"** tab
2. Add these variables:

   ```
   VITE_API_URL=https://backend-production-xxxx.up.railway.app/api
   NODE_ENV=production
   ```

   **IMPORTANT:** Replace `backend-production-xxxx.up.railway.app` with the **actual backend URL** you saved in Step 3E!

✅ **Service 3 Configured: Frontend**

#### E. Generate Frontend Domain
1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. This is your **public frontend URL**!

#### F. Deploy Frontend
1. Click **"Deploy"** or wait for auto-deploy
2. Monitor in **"Deployments"** tab
3. Wait for **"Success"** status

---

### STEP 5: Update Backend CORS (Important!)

The backend needs to allow requests from the frontend domain.

#### A. Get Frontend URL
- Copy your frontend Railway domain (e.g., `frontend-production-xxxx.up.railway.app`)

#### B. Add CORS Variable to Backend
1. Go to **backend** service
2. Click **"Variables"** tab
3. Add this variable:
   ```
   FRONTEND_URL=https://frontend-production-xxxx.up.railway.app
   ```
   (Use your actual frontend URL)

This allows the backend to accept requests from your frontend.

---

### STEP 6: Seed the Database

Now that all services are running, add initial data to your database.

#### Method 1: Using Railway CLI (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Select the BACKEND service when prompted
# (Use arrow keys to select, then press Enter)

# Run seed command
railway run npm run seed
```

#### Method 2: Using Railway Dashboard
1. Click on your **backend** service
2. Click **"Deploy"** tab
3. Click on the latest deployment
4. Click **"View Logs"**
5. Look for database initialization logs

Then manually seed via shell:
1. In backend service, go to **"Settings"**
2. Click **"Open Shell"**
3. Run: `npm run seed`

---

### STEP 7: Verify Everything Works

#### A. Test Backend Health
Open in browser:
```
https://backend-production-xxxx.up.railway.app/api/health
```
Should return: `{"status":"ok","message":"Server is running"}`

#### B. Test Backend API
```
https://backend-production-xxxx.up.railway.app/api/projects
```
Should return: JSON array of projects

#### C. Test Frontend
Open in browser:
```
https://frontend-production-xxxx.up.railway.app
```
Should display your portfolio site!

#### D. Check Frontend → Backend Connection
1. Open frontend URL in browser
2. Open browser DevTools (F12)
3. Go to **"Network"** tab
4. Refresh the page
5. Look for API calls to your backend URL
6. Should see successful responses (status 200)

---

## Final Service Overview

Your Railway project should now have **3 services**:

| Service | Type | Port | Purpose |
|---------|------|------|---------|
| **PostgreSQL** | Database | 5432 | Stores all data |
| **backend** | Node.js | 3001 | API server |
| **frontend** | Static Site | 8080 | User interface |

---

## Environment Variables Summary

### Backend Service Variables
```env
DATABASE_URL=postgresql://...  # Auto-set by Railway
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://frontend-production-xxxx.up.railway.app
```

### Frontend Service Variables
```env
VITE_API_URL=https://backend-production-xxxx.up.railway.app/api
NODE_ENV=production
```

### Database Service
No manual variables needed - all managed by Railway.

---

## Custom Domains (Optional)

To use your own domains:

### For Frontend
1. Click **frontend** service → **"Settings"**
2. Scroll to **"Networking"** → **"Custom Domain"**
3. Enter: `errands.yourdomain.com`
4. Add the provided CNAME record to your DNS

### For Backend
1. Click **backend** service → **"Settings"**
2. Add custom domain: `api.errands.yourdomain.com`
3. Add CNAME record to DNS

**Don't forget** to update the `VITE_API_URL` in frontend service if you change the backend domain!

---

## Troubleshooting

### Frontend shows "Failed to fetch"
**Cause:** Frontend can't reach backend
**Fix:**
1. Verify `VITE_API_URL` in frontend service
2. Check backend is deployed and running
3. Test backend URL directly in browser
4. Check backend CORS settings

### Backend returns 500 errors
**Cause:** Database connection issue
**Fix:**
1. Check `DATABASE_URL` is linked in backend
2. View backend logs for errors
3. Ensure PostgreSQL service is running

### Database is empty
**Cause:** Seed script not run
**Fix:**
1. Run: `railway run npm run seed`
2. Check logs for seed success message

### Changes not deploying
**Cause:** Railway watching wrong files
**Fix:**
1. Go to service **"Settings"**
2. Check **"Watch Paths"**
3. Push a new commit to trigger deployment

---

## Monitoring & Logs

### View Logs
1. Click on any service
2. Go to **"Deployments"** tab
3. Click on a deployment
4. Click **"View Logs"**

### Check Metrics
1. Click on a service
2. Go to **"Metrics"** tab
3. View CPU, memory, and request metrics

---

## Costs

Railway pricing for 3 services:

**Hobby Plan ($5/month):**
- Includes $5 credit
- ~500 execution hours total
- Good for: Development/testing

**Pro Plan ($20/month):**
- Better for production
- More resources
- Priority support

Each service consumes resources independently.

---

## Continuous Deployment

Railway automatically redeploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Railway will automatically:
# 1. Detect the push
# 2. Rebuild affected services
# 3. Deploy new versions
```

---

## Scaling

To scale individual services:

1. Click on the service
2. Go to **"Settings"** → **"Deploy"**
3. Adjust:
   - **Replicas**: Number of instances
   - **Memory**: RAM allocation
   - **CPU**: Processing power

---

## Success! 🎉

You now have:
- ✅ 3 separate Railway services
- ✅ PostgreSQL database with data
- ✅ Backend API serving requests
- ✅ Frontend displaying your portfolio
- ✅ All services connected properly

**Your URLs:**
- Frontend: `https://frontend-production-xxxx.up.railway.app`
- Backend: `https://backend-production-xxxx.up.railway.app/api`

---

## Quick Commands Reference

```bash
# Railway CLI
railway login                    # Login to Railway
railway link                     # Link to project
railway service                  # Select a service
railway run npm run seed         # Run seed script
railway logs                     # View logs
railway open                     # Open in browser

# Local Development
npm run dev:fullstack           # Run locally (uses SQLite)
npm run build                   # Build frontend
npm start                       # Start production server

# Git
git add .
git commit -m "message"
git push origin main            # Triggers Railway deployment
```

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/omarabdelghany2/Errands_New_Version/issues
