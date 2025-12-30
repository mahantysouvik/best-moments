# 🚀 Hosting Guide - Best Moments

## Overview

Your Best Moments app is now set up to be hosted with:
- **Frontend**: GitHub Pages (https://mahantysouvik.github.io/best-moments/)
- **Backend**: Free cloud service (Render/Railway recommended)

---

## 📱 Frontend Deployment (GitHub Pages)

### Automatic Deployment (Recommended)

Your frontend will automatically deploy to GitHub Pages on every push to `main` branch!

### Setup Steps:

1. **Enable GitHub Pages**
   - Go to: https://github.com/mahantysouvik/best-moments/settings/pages
   - Under "Source", select: **GitHub Actions**
   - Save

2. **Add Backend URL Secret**
   - Go to: https://github.com/mahantysouvik/best-moments/settings/secrets/actions
   - Click "New repository secret"
   - Name: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://best-moments-api.onrender.com/api/v1`)
   - Click "Add secret"

3. **Trigger Deployment**
   ```bash
   git add .
   git commit -m "Enable GitHub Pages deployment"
   git push origin main
   ```

4. **Access Your Site**
   - Wait 2-3 minutes for deployment
   - Visit: https://mahantysouvik.github.io/best-moments/

### Manual Deployment

If you prefer manual deployment:

```bash
cd frontend

# Build for production
npm run build

# Deploy using gh-pages
npm install -g gh-pages
gh-pages -d dist
```

---

## 🔧 Backend Deployment

### Option 1: Render (Recommended - Free Tier Available)

**Why Render?**
- ✅ Free tier available
- ✅ Auto-deploy from GitHub
- ✅ MongoDB Atlas integration
- ✅ Easy environment variables
- ✅ Custom domains

**Setup:**

1. **Create Render Account**
   - Go to: https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your `best-moments` repository
   - Configure:
     - **Name**: `best-moments-api`
     - **Region**: Choose closest to you
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - **Instance Type**: `Free`

3. **Add Environment Variables**
   ```
   MONGODB_URL=your_mongodb_atlas_url
   MONGODB_DB_NAME=best_moments
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   AWS_REGION=us-east-1
   S3_BUCKET_NAME=best-moments-images
   FRONTEND_URL=https://mahantysouvik.github.io/best-moments
   CORS_ORIGINS=https://mahantysouvik.github.io
   DEBUG=False
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your API will be at: `https://best-moments-api.onrender.com`

5. **Seed Templates**
   - Go to "Shell" tab in Render dashboard
   - Run: `python seed_templates.py`

6. **Update Frontend Secret**
   - Add the Render URL to GitHub secrets: `VITE_API_URL=https://best-moments-api.onrender.com/api/v1`

---

### Option 2: Railway

**Setup:**

1. Go to: https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `best-moments` repository
5. Add service → Select `backend` folder
6. Add environment variables (same as Render)
7. Deploy!

**Railway provides:**
- Free $5/month credit
- Auto-deploy on push
- Easy database integration

---

### Option 3: Heroku

**Setup:**

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login
heroku login

# Create app
cd backend
heroku create best-moments-api

# Add Procfile (already included)
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile

# Set environment variables
heroku config:set MONGODB_URL=your_url
heroku config:set AWS_ACCESS_KEY_ID=your_key
# ... add all other env vars

# Deploy
git push heroku main

# Seed templates
heroku run python seed_templates.py
```

---

## 🗄️ Database Setup (MongoDB Atlas)

**Free Tier Available!**

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (free)

2. **Create Cluster**
   - Choose "Shared" (Free)
   - Select AWS region closest to you
   - Cluster name: `best-moments`
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Add new user
   - Username: `bestmoments`
   - Password: Generate secure password
   - User privileges: `Atlas Admin`

4. **Whitelist IP**
   - Go to "Network Access"
   - Add IP Address
   - Choose: `Allow access from anywhere` (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string:
     ```
     mongodb+srv://bestmoments:<password>@cluster0.xxxxx.mongodb.net/best_moments?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

6. **Add to Backend**
   - Add connection string to Render/Railway environment variables
   - Set `MONGODB_DB_NAME=best_moments`

---

## ☁️ AWS S3 Setup

1. **Create S3 Bucket**
   - Go to: https://s3.console.aws.amazon.com/
   - Create bucket: `best-moments-images-souvik`
   - Region: US East (N. Virginia)
   - Uncheck "Block all public access"
   - Create bucket

2. **Configure CORS**
   - Go to bucket → Permissions → CORS
   - Add:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
       "AllowedOrigins": ["*"],
       "ExposeHeaders": []
     }
   ]
   ```

3. **Create IAM User**
   - Go to: https://console.aws.amazon.com/iam/
   - Users → Add user
   - Username: `best-moments-uploader`
   - Access type: `Programmatic access`
   - Attach policy: `AmazonS3FullAccess`
   - Create user
   - **Save Access Key ID and Secret Access Key!**

4. **Add to Backend**
   - Add AWS credentials to environment variables

---

## ✅ Post-Deployment Checklist

### 1. Test Frontend
- [ ] Visit: https://mahantysouvik.github.io/best-moments/
- [ ] Check all pages load
- [ ] Verify routing works

### 2. Test Backend
- [ ] Visit: https://your-backend-url.com/docs
- [ ] Test API endpoints
- [ ] Verify MongoDB connection

### 3. Test Full Flow
- [ ] Create an event
- [ ] Generate QR code
- [ ] Upload images
- [ ] View gallery
- [ ] Download images

### 4. Update Links
- [ ] Add to your portfolio: https://mahantysouvik.github.io/portfolio/
- [ ] Update README with live links
- [ ] Share with friends!

---

## 🔗 Your Live URLs

Once deployed, your app will be available at:

- **Frontend**: https://mahantysouvik.github.io/best-moments/
- **Backend**: https://best-moments-api.onrender.com (or your chosen service)
- **API Docs**: https://best-moments-api.onrender.com/docs

---

## 🐛 Troubleshooting

### Frontend Issues

**404 on page refresh:**
- GitHub Pages doesn't support client-side routing by default
- Solution: Add `404.html` that redirects to index.html

**API calls failing:**
- Check CORS settings in backend
- Verify VITE_API_URL is correct
- Check browser console for errors

### Backend Issues

**Deployment fails:**
- Check build logs in Render/Railway
- Verify all dependencies in requirements.txt
- Check Python version compatibility

**Database connection fails:**
- Verify MongoDB connection string
- Check IP whitelist in Atlas
- Verify database user credentials

**Image upload fails:**
- Check AWS credentials
- Verify S3 bucket permissions
- Check CORS configuration

---

## 💰 Cost Breakdown

**Free Tier (Recommended for starting):**
- ✅ GitHub Pages: **FREE**
- ✅ Render Free Tier: **FREE** (with limitations)
- ✅ MongoDB Atlas M0: **FREE** (512MB)
- ⚠️ AWS S3: ~$0.02/GB/month (pay as you go)

**Total Cost to Start: $0-5/month**

**Upgrade Later:**
- Render Paid: $7/month
- MongoDB Atlas M10: $0.08/hour (~$57/month)
- Custom domain: ~$12/year

---

## 🎉 You're All Set!

Your app is now live and accessible to anyone! Share it with:

1. Add to your portfolio
2. Share on LinkedIn
3. Show to friends and family
4. Use for real events!

**Need help?** Check the troubleshooting section or create an issue on GitHub.

---

**Made with ❤️ by Souvik Mahanty**
