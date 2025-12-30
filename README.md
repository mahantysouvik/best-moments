# 📸 Best Moments - Event Photo Sharing Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=github)](https://mahantysouvik.github.io/best-moments/)
[![Backend API](https://img.shields.io/badge/API-Docs-blue?style=for-the-badge&logo=fastapi)](https://best-moments-api.onrender.com/docs)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Capture, Share, and Cherish Your Special Moments** ✨

A modern, full-stack application for managing event photo galleries with QR code access, beautiful templates, and instant uploads. Perfect for weddings, birthdays, engagements, and any special occasion!

## 🌎 Live Demo

🚀 **Try it now**: [https://mahantysouvik.github.io/best-moments/](https://mahantysouvik.github.io/best-moments/)

📖 **API Documentation**: [https://best-moments-api.onrender.com/docs](https://best-moments-api.onrender.com/docs)

---

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
- **Auto Deployment** - GitHub Actions CI/CD pipeline

---

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

### DevOps & Hosting
- **GitHub Pages** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization

---

## 🚀 Quick Deploy (10 Minutes!)

**Want your own live version?** Follow our [QUICKSTART.md](QUICKSTART.md) guide!

### TL;DR:
1. Enable GitHub Pages in repo settings
2. Sign up for free Render account
3. Create free MongoDB Atlas cluster
4. Push to main branch
5. Done! Your app is live! 🎉

**Detailed guide**: [HOSTING.md](HOSTING.md)

---

## 💻 Local Development

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your config
python seed_templates.py
python main.py
```

Backend runs at: http://localhost:8000

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev
```

Frontend runs at: http://localhost:3000

### Docker Setup

```bash
docker-compose up -d
```

Everything runs automatically!

---

## 📸 Screenshots

### Home Page
![Home](https://via.placeholder.com/800x400/9333EA/FFFFFF?text=Beautiful+Landing+Page)

### Create Event
![Create Event](https://via.placeholder.com/800x400/EC4899/FFFFFF?text=Template+Selection)

### Gallery View
![Gallery](https://via.placeholder.com/800x400/8B5CF6/FFFFFF?text=Photo+Gallery)

---

## 📡 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Live API**: https://best-moments-api.onrender.com/docs

### Main Endpoints

```
POST   /api/v1/events/              Create event
GET    /api/v1/events/{code}        Get event by code
POST   /api/v1/images/upload        Upload image
GET    /api/v1/images/event/{id}   List images
POST   /api/v1/albums/              Create album
GET    /api/v1/templates/           List templates
```

---

## 📁 Project Structure

```
best-moments/
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── dao/          # Database access
│   │   ├── models/       # Pydantic models
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helpers
│   ├── main.py
│   └── requirements.txt
│
├── frontend/              # React frontend
│   ├── src/
│   │   ├── api/          # API clients
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route pages
│   │   └── store/        # State management
│   └── package.json
│
├── .github/workflows/     # CI/CD
├── docker-compose.yml
└── README.md
```

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Full-stack development (React + FastAPI)
- ✅ RESTful API design
- ✅ Database modeling (MongoDB)
- ✅ File uploads & cloud storage (S3)
- ✅ Authentication patterns
- ✅ State management (Zustand)
- ✅ Responsive design (TailwindCSS)
- ✅ Animations (Framer Motion)
- ✅ CI/CD (GitHub Actions)
- ✅ Docker containerization
- ✅ Cloud deployment

---

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

---

## 👥 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Links

**Souvik Mahanty**
- 👨‍💻 GitHub: [@mahantysouvik](https://github.com/mahantysouvik)
- 🏢 Company: Infoedge
- 📍 Location: Noida, India
- 🌐 Portfolio: [mahantysouvik.github.io/portfolio](https://mahantysouvik.github.io/portfolio/)
- 🚀 Live App: [mahantysouvik.github.io/best-moments](https://mahantysouvik.github.io/best-moments/)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!

[![GitHub stars](https://img.shields.io/github/stars/mahantysouvik/best-moments?style=social)](https://github.com/mahantysouvik/best-moments)
[![GitHub forks](https://img.shields.io/github/forks/mahantysouvik/best-moments?style=social)](https://github.com/mahantysouvik/best-moments/fork)

---

<div align="center">
  <p><strong>Made with ❤️ by <a href="https://github.com/mahantysouvik">Souvik Mahanty</a></strong></p>
  <p>Part of my portfolio at <a href="https://mahantysouvik.github.io/portfolio/">mahantysouvik.github.io/portfolio</a></p>
</div>
