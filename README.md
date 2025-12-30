# 📸 Best Moments - Event Photo Sharing Platform

![Best Moments Banner](https://img.shields.io/badge/Best_Moments-Event_Photo_Sharing-purple?style=for-the-badge&logo=camera)

**Capture, Share, and Cherish Your Special Moments** ✨

A modern, full-stack application for managing event photo galleries with QR code access, beautiful templates, and instant uploads. Perfect for weddings, birthdays, engagements, and any special occasion!

## ✨ Features

### 🎉 Event Management
- **Beautiful Templates** - Pre-designed templates for weddings, birthdays, engagements, and more
- **QR Code Generation** - Automatic QR code creation for easy guest access
- **Event Codes** - Unique 8-character codes for each event
- **Customizable Details** - Add event name, date, location, and description

### 📷 Photo Upload & Management
- **Drag & Drop Upload** - Easy file upload with progress tracking
- **Album Organization** - Create and manage photo albums
- **Bulk Upload** - Upload multiple photos simultaneously
- **Image Preview** - Real-time preview before upload
- **Cloud Storage** - Secure S3 storage with CDN delivery

### 🖼️ Gallery & Viewing
- **Masonry Grid Layout** - Beautiful responsive photo gallery
- **Album Filtering** - View photos by album or all together
- **Lightbox View** - Full-screen image viewing
- **Download Photos** - Download individual or multiple photos
- **Lazy Loading** - Optimized loading for better performance

### 🛡️ Technical Features
- **RESTful API** - Clean, documented API endpoints
- **Data Validation** - Pydantic models for request validation
- **Error Handling** - Comprehensive exception handling
- **CORS Support** - Cross-origin resource sharing enabled
- **Responsive Design** - Mobile-first, works on all devices
- **Animations** - Smooth Framer Motion animations

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **MongoDB** - NoSQL database with Motor async driver
- **AWS S3** - Cloud storage for images
- **Pillow** - Image processing and manipulation
- **QRCode** - QR code generation
- **Pydantic** - Data validation and settings management

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready animations
- **Axios** - HTTP client for API calls
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **React Dropzone** - File upload with drag & drop
- **React Hot Toast** - Beautiful notifications

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (local or Atlas)
- AWS Account (for S3)

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/mahantysouvik/best-moments.git
cd best-moments/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Configure MongoDB**
- Install MongoDB locally or use MongoDB Atlas
- Update `MONGODB_URL` in `.env`

6. **Configure AWS S3**
- Create an S3 bucket
- Get AWS credentials (Access Key ID & Secret Access Key)
- Update AWS settings in `.env`

7. **Run the backend**
```bash
python main.py
# or
uvicorn main:app --reload --port 8000
```

Backend will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your API URL
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Frontend will run on `http://localhost:3000`

## 📝 Environment Variables

### Backend (.env)
```env
# Application
DEBUG=True
HOST=0.0.0.0
PORT=8000

# MongoDB
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=best_moments

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=best-moments-images
CLOUDFRONT_DOMAIN=your-domain.cloudfront.net

# Frontend URL
FRONTEND_URL=http://localhost:3000

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 📡 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Main Endpoints

#### Events
- `POST /api/v1/events/` - Create new event
- `GET /api/v1/events/{event_id}` - Get event by ID
- `GET /api/v1/events/code/{event_code}` - Get event by code
- `PUT /api/v1/events/{event_id}` - Update event
- `DELETE /api/v1/events/{event_id}` - Delete event
- `GET /api/v1/events/` - List events

#### Templates
- `GET /api/v1/templates/` - List all templates
- `GET /api/v1/templates/{template_id}` - Get template
- `POST /api/v1/templates/` - Create template

#### Images
- `POST /api/v1/images/upload` - Upload image
- `GET /api/v1/images/event/{event_id}` - List images by event
- `GET /api/v1/images/album/{album_id}` - List images by album
- `DELETE /api/v1/images/{image_id}` - Delete image

#### Albums
- `POST /api/v1/albums/` - Create album
- `GET /api/v1/albums/event/{event_id}` - List albums by event
- `PUT /api/v1/albums/{album_id}` - Update album
- `DELETE /api/v1/albums/{album_id}` - Delete album

## 📦 Project Structure

```
best-moments/
├── backend/
│   ├── app/
│   │   ├── dao/              # Data Access Objects
│   │   │   ├── base_dao.py
│   │   │   ├── event_dao.py
│   │   │   ├── album_dao.py
│   │   │   ├── image_dao.py
│   │   │   └── template_dao.py
│   │   ├── models/           # Pydantic Models
│   │   │   ├── event.py
│   │   │   ├── album.py
│   │   │   ├── image.py
│   │   │   └── template.py
│   │   ├── routes/           # API Routes
│   │   │   ├── event_routes.py
│   │   │   ├── album_routes.py
│   │   │   ├── image_routes.py
│   │   │   └── template_routes.py
│   │   ├── services/         # Business Logic
│   │   │   ├── event_service.py
│   │   │   ├── album_service.py
│   │   │   ├── image_service.py
│   │   │   └── template_service.py
│   │   ├── utils/            # Utilities
│   │   │   ├── exceptions.py
│   │   │   ├── responses.py
│   │   │   ├── s3_helper.py
│   │   │   └── qr_generator.py
│   │   └── database.py
│   ├── config.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── api/              # API Client
    │   │   ├── client.js
    │   │   ├── events.js
    │   │   ├── albums.js
    │   │   ├── images.js
    │   │   └── templates.js
    │   ├── components/       # Reusable Components
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Loading.jsx
    │   │   └── EmptyState.jsx
    │   ├── pages/            # Page Components
    │   │   ├── Home.jsx
    │   │   ├── CreateEvent.jsx
    │   │   ├── EventView.jsx
    │   │   ├── UploadImages.jsx
    │   │   ├── ViewGallery.jsx
    │   │   ├── EventDetails.jsx
    │   │   └── NotFound.jsx
    │   ├── store/            # State Management
    │   │   └── useEventStore.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

## 🚀 Deployment

### Backend Deployment (Options)

#### 1. AWS EC2 / DigitalOcean
```bash
# Install dependencies
sudo apt update
sudo apt install python3-pip python3-venv nginx

# Clone and setup
git clone https://github.com/mahantysouvik/best-moments.git
cd best-moments/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run with Gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

#### 2. Heroku
```bash
# Create Procfile
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile

# Deploy
heroku create your-app-name
git push heroku main
```

#### 3. Railway / Render
- Connect your GitHub repository
- Set environment variables
- Deploy automatically

### Frontend Deployment (Options)

#### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### 2. Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

#### 3. AWS S3 + CloudFront
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

## 📝 Future Enhancements

- [ ] **Authentication** - User accounts and login
- [ ] **Private Events** - Guest list with phone verification
- [ ] **Payment Integration** - Subscription plans
- [ ] **Mobile Apps** - Android and iOS applications
- [ ] **AI Features** - Auto-tagging and face recognition
- [ ] **Video Support** - Upload and share videos
- [ ] **Social Sharing** - Share directly to social media
- [ ] **Email Notifications** - Event reminders and updates
- [ ] **Analytics** - Event statistics and insights
- [ ] **Custom Domains** - Personalized event URLs

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Souvik Mahanty**
- GitHub: [@mahantysouvik](https://github.com/mahantysouvik)
- Company: Infoedge
- Location: Noida, India

## 🚀 Show your support

Give a ⭐️ if this project helped you!

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/mahantysouvik">Souvik Mahanty</a>
</div>
