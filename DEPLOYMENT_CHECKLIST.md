# ✅ Railway 3-Service Deployment Checklist

Follow this checklist to deploy your Errands Portfolio with **3 SEPARATE SERVICES**.

---

## 📋 Pre-Deployment Checklist

- [x] Code pushed to GitHub: `omarabdelghany2/Errands_New_Version`
- [x] PostgreSQL support configured
- [x] Environment variables templates created
- [x] Deployment guides written

---

## 🚂 Railway Deployment Steps

### □ STEP 1: Create Railway Project (2 min)
1. Go to: **https://railway.app/new**
2. Click **"Deploy from GitHub repo"**
3. Select: **`omarabdelghany2/Errands_New_Version`**
4. First service auto-created ✓

---

### □ STEP 2: Add Database Service (1 min)
1. Click **"+ New"** → **"Database"** → **"PostgreSQL"**
2. Wait for provisioning (~30 sec)
3. ✅ **Service 1: PostgreSQL** is ready

---

### □ STEP 3: Configure Backend Service (3 min)
1. Click on first service → **"Settings"**
2. Rename to: **`backend`**
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `npm start`
5. Go to **"Variables"** tab:
   - Add: `NODE_ENV=production`
   - Add: `PORT=3001`
   - **Add Reference** → Select PostgreSQL → `DATABASE_URL`
6. Go to **"Settings"** → **"Networking"**
7. Click **"Generate Domain"**
8. **📝 COPY BACKEND URL** (you'll need this!)
9. Click **"Deploy"** and wait for success
10. ✅ **Service 2: Backend** is ready

---

### □ STEP 4: Add Frontend Service (3 min)
1. Click **"+ New"** → **"GitHub Repo"**
2. Select **same repo**: `omarabdelghany2/Errands_New_Version`
3. Click on new service → **"Settings"**
4. Rename to: **`frontend`**
5. Set **Build Command**: `npm install && npm run build`
6. Set **Start Command**: `npx serve -s dist -l 8080`
7. Go to **"Variables"** tab:
   - Add: `NODE_ENV=production`
   - Add: `VITE_API_URL=https://YOUR-BACKEND-URL/api`
     (Use the backend URL you copied in Step 3!)
8. Go to **"Settings"** → **"Networking"**
9. Click **"Generate Domain"**
10. Click **"Deploy"** and wait for success
11. ✅ **Service 3: Frontend** is ready

---

### □ STEP 5: Update Backend CORS (1 min)
1. Go to **backend** service
2. Click **"Variables"** tab
3. Add: `FRONTEND_URL=https://YOUR-FRONTEND-URL`
   (Use the frontend URL from Step 4)
4. Service will auto-redeploy

---

### □ STEP 6: Seed Database (2 min)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Select "backend" service when prompted

# Seed the database
railway run npm run seed
```

---

### □ STEP 7: Verify Deployment (2 min)

**Test Backend:**
Open: `https://YOUR-BACKEND-URL/api/health`
✓ Should show: `{"status":"ok","message":"Server is running"}`

**Test API:**
Open: `https://YOUR-BACKEND-URL/api/projects`
✓ Should show: JSON array of projects

**Test Frontend:**
Open: `https://YOUR-FRONTEND-URL`
✓ Should display your portfolio website

**Test Integration:**
1. Open frontend URL
2. Press F12 (DevTools)
3. Go to Network tab
4. Refresh page
5. ✓ Check API calls are successful (status 200)

---

## 🎯 Final Setup

After completing all steps, you should have:

### Service 1: PostgreSQL Database
- ✓ Status: Running
- ✓ Tables: Created
- ✓ Data: Seeded

### Service 2: Backend API
- ✓ Status: Running
- ✓ URL: `https://backend-xxx.up.railway.app`
- ✓ Connected to database
- ✓ CORS configured

### Service 3: Frontend
- ✓ Status: Running
- ✓ URL: `https://frontend-xxx.up.railway.app`
- ✓ Connected to backend
- ✓ Site loads properly

---

## 📝 Save Your URLs

**Frontend URL:**
```
https://_____________________________________.up.railway.app
```

**Backend URL:**
```
https://_____________________________________.up.railway.app/api
```

**Database:**
```
Managed internally by Railway (no public URL needed)
```

---

## 🔄 Making Updates

After deployment, to update your site:

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# Railway automatically:
# ✓ Detects the push
# ✓ Rebuilds services
# ✓ Deploys updates
```

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Frontend shows "Failed to fetch" | Check `VITE_API_URL` in frontend variables |
| Backend 500 errors | Check `DATABASE_URL` is linked |
| Database empty | Run `railway run npm run seed` |
| Deployment fails | Check logs in "Deployments" tab |

---

## 📚 Full Documentation

For detailed step-by-step guide, see:
**`RAILWAY_3_SERVICES.md`**

---

## ✅ Deployment Complete!

Once all checkboxes are ticked:
- 🎉 Your portfolio is LIVE
- 🎉 3 services running independently
- 🎉 Database populated with data
- 🎉 Auto-deployment configured

**Share your frontend URL with the world!** 🚀
