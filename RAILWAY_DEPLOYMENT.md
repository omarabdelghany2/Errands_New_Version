# Railway Deployment Guide

This guide will help you deploy the Errands Portfolio Showcase to Railway with 3 services:
1. **PostgreSQL Database** - Managed database service
2. **Backend API** - Express.js server
3. **Frontend** - Static Vite build

## Prerequisites

- Railway account (sign up at [railway.app](https://railway.app))
- Railway CLI installed (optional but recommended)
- GitHub repository with your code

## Architecture Overview

```
┌─────────────────┐
│   Frontend      │
│   (Static Site) │
└────────┬────────┘
         │
         ├── API Calls
         │
         ▼
┌─────────────────┐       ┌──────────────────┐
│   Backend API   │◄──────┤   PostgreSQL     │
│   (Express.js)  │       │   Database       │
└─────────────────┘       └──────────────────┘
```

## Step-by-Step Deployment

### Step 1: Create a New Railway Project

1. Go to [railway.app/new](https://railway.app/new)
2. Click **"New Project"**
3. Choose **"Deploy from GitHub repo"**
4. Select your repository: `errands-portfolio-showcase`

### Step 2: Add PostgreSQL Database Service

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. The `DATABASE_URL` environment variable will be automatically set

### Step 3: Deploy Backend Service

1. Click **"+ New"** → **"GitHub Repo"** → Select your repo again
2. Name this service: **"backend"**
3. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `/` (leave as root)

4. Add environment variables (click on the backend service → Variables):
   ```
   NODE_ENV=production
   PORT=3001
   ```

5. **Connect to Database**:
   - Click on the backend service
   - Go to **"Variables"** tab
   - Click **"Add Reference"**
   - Select your PostgreSQL database
   - Choose `DATABASE_URL` variable
   - This links the backend to the database

6. Click **"Deploy"**

### Step 4: Deploy Frontend Service

Railway has two options for frontend deployment:

#### Option A: Static Site (Recommended)

1. Click **"+ New"** → **"GitHub Repo"** → Select your repo again
2. Name this service: **"frontend"**
3. Configure the service:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l 8080`
   - **Root Directory**: `/` (leave as root)

4. Add environment variables:
   ```
   VITE_API_URL=https://your-backend-service.up.railway.app/api
   NODE_ENV=production
   ```

   Replace `your-backend-service.up.railway.app` with your actual backend URL (found in the backend service settings)

5. Click **"Deploy"**

#### Option B: Serve from Backend (Simpler)

If you prefer a 2-service setup instead of 3, you can serve the frontend from the backend:

1. Skip creating a separate frontend service
2. The backend will automatically serve the built frontend from the `dist` folder
3. Make sure to build the frontend first: `npm run build`
4. Commit the `dist` folder to git (remove from `.gitignore` temporarily)

### Step 5: Seed the Database

After deployment, you need to seed your database with initial data:

#### Method 1: Using Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Select your backend service
railway service

# Run seed command
railway run npm run seed
```

#### Method 2: Manual Connection
1. Get your database credentials from Railway (PostgreSQL service → Connect)
2. Use a PostgreSQL client (TablePlus, pgAdmin, psql) to connect
3. Run the seed script locally:
   ```bash
   # Set DATABASE_URL environment variable
   export DATABASE_URL="your-railway-postgres-url"

   # Run seed
   npm run seed
   ```

### Step 6: Configure Environment Variables

Make sure these environment variables are set correctly:

**Backend Service:**
```env
DATABASE_URL=<automatically set by Railway>
NODE_ENV=production
PORT=3001
```

**Frontend Service (if using Option A):**
```env
VITE_API_URL=https://your-backend.up.railway.app/api
NODE_ENV=production
```

### Step 7: Set Up Custom Domains (Optional)

1. Go to each service's **Settings** → **Domains**
2. Click **"Generate Domain"** for a Railway domain
3. Or add your custom domain

Recommended setup:
- Frontend: `errands.yourdomain.com`
- Backend: `api.errands.yourdomain.com`

## Project Structure for Railway

```
errands-portfolio-showcase/
├── server/                 # Backend code
│   ├── db.js              # Database adapter (SQLite/PostgreSQL)
│   ├── server.js          # Express server
│   ├── routes/            # API routes
│   └── seed.js            # Database seeding
├── src/                   # Frontend code
│   ├── components/        # React components
│   ├── pages/             # Page components
│   └── lib/               # Utilities & API client
├── package.json           # Dependencies & scripts
├── vite.config.ts         # Vite configuration
├── railway.json           # Railway configuration
└── .env.example           # Environment variables template
```

## Database Configuration

The project automatically detects the environment:

- **Local Development**: Uses SQLite (`server/database.sqlite`)
- **Production (Railway)**: Uses PostgreSQL (via `DATABASE_URL`)

No code changes needed - it's handled automatically in `server/db.js`!

## Troubleshooting

### Backend can't connect to database
- Verify the `DATABASE_URL` variable is set in the backend service
- Check that you've linked the PostgreSQL database to the backend service
- Look at the backend logs for connection errors

### Frontend can't reach backend
- Verify `VITE_API_URL` points to the correct backend URL
- Check CORS settings in `server/server.js`
- Ensure backend service is running (check Railway logs)

### Database is empty
- Run the seed command (see Step 5)
- Check that migrations ran successfully
- View PostgreSQL logs in Railway

### Build fails
- Check Node.js version compatibility
- Verify all dependencies are in `package.json` (not devDependencies for production packages)
- Review Railway build logs

## Useful Commands

```bash
# Local development (uses SQLite)
npm run dev:fullstack

# Build frontend
npm run build

# Start production server (serves frontend + API)
npm start

# Seed database
npm run seed

# View Railway logs
railway logs

# Connect to Railway shell
railway shell
```

## Cost Estimation

Railway pricing (as of 2024):
- **Hobby Plan**: $5/month includes:
  - 500 hours of usage
  - $5 usage credit
  - Suitable for small projects

- **Pro Plan**: $20/month includes:
  - Unlimited services
  - Priority support
  - Custom domains

Each service runs independently and consumes resources based on usage.

## Continuous Deployment

Railway automatically:
- Deploys when you push to your main branch
- Rebuilds and redeploys all services
- Manages environment variables
- Provides deployment previews for PRs

## Security Best Practices

1. ✅ Never commit `.env` files
2. ✅ Use Railway's environment variables
3. ✅ Enable SSL (automatic with Railway)
4. ✅ Regularly update dependencies
5. ✅ Use strong database passwords (Railway generates these)

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Project Issues: Open an issue on GitHub

## Summary

You should now have:
- ✅ PostgreSQL database running on Railway
- ✅ Backend API deployed and connected to database
- ✅ Frontend deployed and connected to backend
- ✅ Database seeded with initial data
- ✅ Custom domains configured (optional)

Your application is now live! 🎉
