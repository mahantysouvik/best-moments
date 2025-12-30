# 🚀 Quick Start - Deploy Your Best Moments App

## Get Your App Live in 10 Minutes! ⏱️

### Step 1: Enable GitHub Pages (2 minutes)

1. Go to your repo settings:
   ```
   https://github.com/mahantysouvik/best-moments/settings/pages
   ```

2. Under "Source", select: **GitHub Actions**

3. Click **Save**

🎉 **Frontend will auto-deploy on every push!**

---

### Step 2: Set Up Free Backend on Render (5 minutes)

1. **Sign up**: https://render.com/ (use GitHub login)

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect `mahantysouvik/best-moments` repo
   - Settings:
     - Name: `best-moments-api`
     - Root Directory: `backend`
     - Build: `pip install -r requirements.txt`
     - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
     - Free tier

3. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URL=your_mongodb_url_here
   MONGODB_DB_NAME=best_moments
   AWS_ACCESS_KEY_ID=your_aws_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret
   S3_BUCKET_NAME=your-bucket-name
   FRONTEND_URL=https://mahantysouvik.github.io/best-moments
   CORS_ORIGINS=https://mahantysouvik.github.io
   DEBUG=False
   ```

4. Click **Create Web Service**

5. Wait 5-10 minutes for deployment

6. Your API will be at: `https://best-moments-api-xxxx.onrender.com`

---

### Step 3: Set Up Free MongoDB (3 minutes)

1. **Sign up**: https://www.mongodb.com/cloud/atlas/register

2. **Create Free Cluster**:
   - Choose "Shared" (M0 - Free)
   - Any cloud region
   - Name: `best-moments`

3. **Create User**:
   - Database Access → Add User
   - Username: `bestmoments`
   - Auto-generate password → **Copy it!**

4. **Whitelist IPs**:
   - Network Access → Add IP
   - Allow from anywhere: `0.0.0.0/0`

5. **Get Connection String**:
   - Connect → Connect your application
   - Copy the string
   - Replace `<password>` with your actual password

6. **Add to Render**:
   - Go back to Render dashboard
   - Environment → Add `MONGODB_URL` with your connection string

---

### Step 4: Set Up AWS S3 (Optional - for image uploads)

If you want image uploads to work:

1. Create S3 bucket on AWS
2. Get Access Key and Secret Key
3. Add to Render environment variables

**OR skip for now** - you can add this later!

---

### Step 5: Connect Frontend to Backend (1 minute)

1. Go to: https://github.com/mahantysouvik/best-moments/settings/secrets/actions

2. Click "New repository secret"

3. Add:
   - Name: `VITE_API_URL`
   - Value: `https://your-render-url.onrender.com/api/v1`

4. Save!

---

### Step 6: Trigger Deployment

Make any small change and push:

```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

---

## ✅ Done! Your App is Live!

**Frontend**: https://mahantysouvik.github.io/best-moments/

**Backend**: https://your-app.onrender.com

**API Docs**: https://your-app.onrender.com/docs

---

## 🐛 Troubleshooting

### GitHub Pages not working?
- Check Actions tab for build errors
- Make sure Pages is enabled
- Wait 2-3 minutes after push

### Render deployment failing?
- Check "Logs" tab in Render dashboard
- Verify all environment variables are set
- Make sure Python version is 3.9+

### Can't connect to backend?
- Check CORS_ORIGINS includes your GitHub Pages URL
- Verify backend is running (green status in Render)
- Check browser console for errors

---

## 💸 Costs

- GitHub Pages: **FREE** ✅
- Render Free Tier: **FREE** ✅
- MongoDB Atlas M0: **FREE** ✅
- AWS S3: ~$0-5/month (optional)

**Total: $0/month to start!** 🎉

---

## 👍 What's Next?

1. **Test your app** - Create an event, upload photos
2. **Add to portfolio** - Link from https://mahantysouvik.github.io/portfolio/
3. **Share it** - Post on LinkedIn, show friends
4. **Customize** - Change colors, add features
5. **Scale up** - Upgrade when you get users!

---

Need detailed instructions? Check [HOSTING.md](HOSTING.md)

Have questions? Create an issue on GitHub!
