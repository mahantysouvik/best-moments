# Deployment Guide - Best Moments

## Prerequisites
- Domain name (optional but recommended)
- SSL certificate (Let's Encrypt recommended)
- AWS account for S3 storage
- MongoDB Atlas account or self-hosted MongoDB

## Option 1: Docker Deployment (Recommended)

### 1. Install Docker & Docker Compose
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### 2. Configure Environment
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your production values

# Frontend
cd ../frontend
cp .env.example .env
# Edit .env with your production API URL
```

### 3. Build and Run
```bash
# From project root
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Option 2: Manual Deployment

### Backend on Ubuntu Server

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Install Python and dependencies
sudo apt install python3-pip python3-venv nginx -y

# 3. Clone repository
git clone https://github.com/mahantysouvik/best-moments.git
cd best-moments/backend

# 4. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 5. Install dependencies
pip install -r requirements.txt
pip install gunicorn

# 6. Configure environment
cp .env.example .env
nano .env  # Edit with your values

# 7. Seed templates
python seed_templates.py

# 8. Create systemd service
sudo nano /etc/systemd/system/best-moments.service
```

**Service file content:**
```ini
[Unit]
Description=Best Moments FastAPI Application
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/best-moments/backend
Environment="PATH=/home/ubuntu/best-moments/backend/venv/bin"
ExecStart=/home/ubuntu/best-moments/backend/venv/bin/gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# 9. Start service
sudo systemctl daemon-reload
sudo systemctl start best-moments
sudo systemctl enable best-moments

# 10. Configure Nginx
sudo nano /etc/nginx/sites-available/best-moments
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/best-moments /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Certbot
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

### Frontend Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod
```

#### Netlify
```bash
# Build
npm run build

# Deploy via Netlify CLI or drag-and-drop dist folder
netlify deploy --prod --dir=dist
```

#### Self-hosted with Nginx
```bash
# Build frontend
cd frontend
npm run build

# Copy build to server
scp -r dist/ user@server:/var/www/best-moments

# Nginx config for frontend
sudo nano /etc/nginx/sites-available/best-moments-frontend
```

**Frontend Nginx config:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/best-moments;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

## AWS S3 Configuration

### 1. Create S3 Bucket
```bash
aws s3 mb s3://best-moments-images --region us-east-1
```

### 2. Set Bucket Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::best-moments-images/*"
        }
    ]
}
```

### 3. Enable CORS
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

### 4. Create IAM User
- Create user with programmatic access
- Attach policy: `AmazonS3FullAccess` (or create custom policy)
- Save Access Key ID and Secret Access Key
- Add to backend .env file

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)
1. Create account at mongodb.com/atlas
2. Create new cluster (Free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get connection string
6. Update MONGODB_URL in .env

### Option 2: Self-hosted
```bash
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Environment Variables Checklist

### Backend (.env)
- [x] MONGODB_URL
- [x] AWS_ACCESS_KEY_ID
- [x] AWS_SECRET_ACCESS_KEY
- [x] S3_BUCKET_NAME
- [x] FRONTEND_URL
- [x] CORS_ORIGINS

### Frontend (.env)
- [x] VITE_API_URL

## Post-Deployment

1. **Test all endpoints**
   - Create event
   - Upload images
   - View gallery
   - Download images

2. **Monitor logs**
   ```bash
   # Backend logs
   sudo journalctl -u best-moments -f
   
   # Nginx logs
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Set up monitoring**
   - Use PM2 for Node.js processes
   - Set up Sentry for error tracking
   - Configure CloudWatch for AWS resources

4. **Backup strategy**
   - Regular MongoDB backups
   - S3 versioning enabled
   - Code backed up in Git

## Troubleshooting

### Backend not starting
- Check logs: `sudo journalctl -u best-moments -n 50`
- Verify .env file
- Test MongoDB connection
- Check port availability: `sudo netstat -tlnp | grep 8000`

### Frontend build fails
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Check Node version: `node --version` (should be 18+)

### CORS errors
- Verify CORS_ORIGINS in backend .env
- Check Nginx proxy headers
- Ensure frontend URL is whitelisted

### S3 upload fails
- Verify AWS credentials
- Check bucket permissions
- Verify CORS configuration
- Check IAM user permissions

## Performance Optimization

1. **Enable CDN** (CloudFront for S3)
2. **Enable Gzip** compression in Nginx
3. **Set up caching** headers
4. **Use connection pooling** for MongoDB
5. **Optimize images** before upload
6. **Enable lazy loading** in frontend

## Security Checklist

- [ ] Use HTTPS everywhere
- [ ] Set strong MongoDB passwords
- [ ] Restrict S3 bucket access
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates
- [ ] Implement input validation
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly
- [ ] Implement request size limits

---

For support, create an issue on GitHub or contact the maintainer.
