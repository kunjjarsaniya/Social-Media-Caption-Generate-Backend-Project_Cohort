# 🚀 CaptionKatha - Complete Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Deployment](#backend-deployment-vercel)
3. [Frontend Deployment](#frontend-deployment-vercel)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Environment Variables](#environment-variables-reference)
6. [Troubleshooting](#troubleshooting)
7. [Production Checklist](#production-checklist)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ [Vercel Account](https://vercel.com/signup) (free tier works fine)
- ✅ [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register) (free tier available)
- ✅ [Google AI API Key](https://aistudio.google.com/app/apikey) (Gemini API)
- ✅ GitHub repository with your code
- ✅ JWT Secret (generate a random string)

---

## Backend Deployment (Vercel)

### Step 1: Prepare Environment Variables

Before deploying, gather these values:

| Variable | Description | How to Get |
|----------|-------------|------------|
| `MONGODB_URL` | MongoDB connection string | From MongoDB Atlas dashboard |
| `JWT_SECRET` | Secret for JWT tokens | Generate random string (32+ chars) |
| `GEMINI_API_KEY` | Google AI API key | From Google AI Studio |
| `FRONTEND_URL` | Your frontend URL | Will set after frontend deployment |

**Generate JWT Secret:**
```bash
# On Windows (PowerShell)
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# On Mac/Linux
openssl rand -base64 32
```

### Step 2: Deploy Backend to Vercel

1. **Push code to GitHub** (if not already done):
   ```bash
   cd backend
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import Project in Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `backend` folder as the root directory
   - Framework Preset: **Other**
   - Click "Deploy"

3. **Add Environment Variables** (IMPORTANT - Do this BEFORE first deployment or redeploy after):
   - In Vercel project settings → Environment Variables
   - Add all variables from the table above:
     ```
     MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/captionkatha
     JWT_SECRET=your-generated-secret-here
     GEMINI_API_KEY=your-gemini-api-key-here
     FRONTEND_URL=  # Leave empty for now, will update after frontend deployment
     ```

4. **Verify Backend Deployment**:
   - Copy your backend URL (e.g., `https://your-backend.vercel.app`)
   - Test in browser: `https://your-backend.vercel.app/api/posts`
   - You should see: `{"message":"Cannot GET /api/posts"}` (normal - requires POST)

---

## Frontend Deployment (Vercel)

### Step 1: Update Production Environment File

1. Open `frontend/.env.production`
2. Replace `https://your-backend-url.vercel.app` with your **actual backend URL** from Step 2.4 above:
   ```env
   VITE_BACKEND_URL=https://your-backend.vercel.app
   ```

3. **Commit this change**:
   ```bash
   cd frontend
   git add .env.production
   git commit -m "Update production backend URL"
   git push origin main
   ```

### Step 2: Deploy Frontend to Vercel

1. **Import Frontend Project**:
   - In Vercel Dashboard → "Add New" → "Project"
   - Import the same repository
   - Select the `frontend` folder as root directory
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `dist` (should auto-detect)

2. **Add Environment Variable**:
   - In project settings → Environment Variables
   - Add:
     ```
     VITE_BACKEND_URL=https://your-backend.vercel.app
     ```
   - Make sure to use your actual backend URL!

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

4. **Get Frontend URL**:
   - Copy your frontend URL (e.g., `https://your-frontend.vercel.app`)

---

## Post-Deployment Configuration

### Update Backend CORS Settings

Now that you have the frontend URL, you need to allow it in CORS:

1. **Go to Backend Project** in Vercel Dashboard
2. **Environment Variables** → Add/Edit:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. **Redeploy** the backend:
   - Go to Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

### Update Meta Tags (Optional but Recommended)

1. Open `frontend/index.html`
2. Replace `https://yourdomain.com/` with your actual frontend URL:
   ```html
   <meta property="og:url" content="https://your-frontend.vercel.app/" />
   <meta property="og:image" content="https://your-frontend.vercel.app/og-image.png" />
   <!-- etc. for all meta tags with yourdomain.com -->
   ```
3. Commit and push - Vercel will auto-deploy

---

## Environment Variables Reference

### Backend (.env)

```plaintext
# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/captionkatha

# Authentication
JWT_SECRET=your-super-secret-jwt-key-32-chars-minimum

# AI Service
GEMINI_API_KEY=your-google-gemini-api-key

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.vercel.app

# Optional
PORT=3000  # Not needed for Vercel, auto-assigned
```

### Frontend (.env.production)

```plaintext
# Backend API URL
VITE_BACKEND_URL=https://your-backend.vercel.app
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. **CORS Error in Browser Console**

**Error:**
```
Access to XMLHttpRequest at 'https://backend.vercel.app/api/posts' 
from origin 'https://frontend.vercel.app' has been blocked by CORS policy
```

**Solution:**
- Ensure `FRONTEND_URL` environment variable is set in backend
- Make sure you redeployed backend after adding `FRONTEND_URL`
- Check the URL matches exactly (no trailing slash mismatch)

#### 2. **404 on API Calls**

**Error:**
```
POST https://frontend.vercel.app/undefined/api/posts 404
```

**Solution:**
- `VITE_BACKEND_URL` not set in frontend environment variables
- Go to Vercel → Frontend Project → Settings → Environment Variables
- Add `VITE_BACKEND_URL` with your backend URL
- Redeploy frontend

#### 3. **MongoDB Connection Error**

**Error:**
```
MongooseError: Could not connect to MongoDB
```

**Solution:**
- Verify `MONGODB_URL` in backend environment variables
- Check MongoDB Atlas:
  - Network Access: Add `0.0.0.0/0` to allow Vercel IP addresses
  - Database User: Ensure credentials are correct
  - Connection string: Should use `mongodb+srv://` format

#### 4. **Gemini API Error**

**Error:**
```
API key not valid
```

**Solution:**
- Verify `GEMINI_API_KEY` in backend settings
- Generate new key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- Ensure no extra spaces in the key

#### 5. **Build Fails on Frontend**

**Error:**
```
Build failed: command exited with code 1
```

**Solution:**
- Check build logs in Vercel
- Common issues:
  - Missing dependencies: Run `npm install` locally first
  - Environment variable not set during build
  - Import errors: Check for case-sensitive file names

---

## Production Checklist

Before going live, verify:

### Backend
- [ ] MongoDB Atlas database created and accessible
- [ ] All environment variables set in Vercel
- [ ] Backend deployment successful
- [ ] API endpoints responding (test with Postman/curl)
- [ ] CORS configured with production frontend URL

### Frontend
- [ ] `VITE_BACKEND_URL` pointing to production backend
- [ ] Build completes without errors
- [ ] All pages load correctly
- [ ] Meta tags updated with production URLs
- [ ] OG image accessible

### Testing
- [ ] Upload image/video works
- [ ] Caption generation works
- [ ] All modes tested (Funny, Professional, etc.)
- [ ] All languages tested
- [ ] Responsive design works on mobile

### Security
- [ ] Environment variables are secrets (not in code)
- [ ] CORS properly configured (not allowing all origins)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] MongoDB network access properly configured

---

## Custom Domain (Optional)

### Add Custom Domain to Frontend

1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel Frontend Project → Settings → Domains
3. Add your domain (e.g., `captionkatha.com`)
4. Follow DNS configuration instructions
5. Update `FRONTEND_URL` in backend environment variables
6. Redeploy backend

### Add Custom Domain to Backend

1. In Vercel Backend Project → Settings → Domains
2. Add subdomain (e.g., `api.captionkatha.com`)
3. Configure DNS
4. Update `VITE_BACKEND_URL` in frontend environment variables
5. Redeploy frontend

---

## Monitoring and Logs

### View Logs in Vercel

1. Go to project → **Deployments**
2. Click on latest deployment
3. Click **View Function Logs** (for backend)
4. Check for errors

### Monitor Performance

- Vercel Dashboard shows:
  - Request count
  - Build times
  - Error rates
  - Bandwidth usage

---

## Need Help?

- 📧 Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- 🔧 MongoDB Atlas: [mongodb.com/docs](https://www.mongodb.com/docs/)
- 🤖 Google AI: [ai.google.dev/docs](https://ai.google.dev/docs)

---

**Congratulations! 🎉** Your CaptionKatha app is now live on production!
