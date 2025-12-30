# Best Moments

**Event Photo Sharing Platform** - Upload, organize, and share your special moments with beautiful templates and QR code integration.

## 🌟 Features

- 📸 **Event Templates**: Choose from beautiful pre-designed templates for weddings, birthdays, engagements, and more
- 📱 **QR Code Generation**: Unique QR codes for easy event access
- 🖼️ **Image Upload & Organization**: Upload photos to organized folders and albums
- 🎨 **Beautiful UI**: Modern, responsive, and user-friendly interface
- ☁️ **Cloud Storage**: Secure S3-backed image storage
- 🔒 **Private Events**: Future support for guest list management

## 🏗️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Storage**: AWS S3
- **Image Generation**: OpenAI DALL-E / GPT Vision

### Frontend
- **Framework**: React
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context / Redux
- **HTTP Client**: Axios

## 📁 Project Structure

```
best-moments/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── models/              # Pydantic models
│   ├── services/            # Business logic layer
│   ├── dao/                 # Data access objects
│   ├── routes/              # API endpoints
│   ├── utils/               # Utilities (exceptions, responses)
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   └── package.json        # Node dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB
- AWS Account (for S3)
- OpenAI API Key

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# Run the application
python main.py
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🔧 Configuration

Edit `backend/.env` for:
- MongoDB connection
- AWS S3 credentials
- OpenAI API key
- CORS origins

## 🎯 Roadmap

- [ ] Payment/Subscription integration
- [ ] Private events with guest list
- [ ] Phone number verification
- [ ] Android & iOS mobile apps
- [ ] Advanced photo editing
- [ ] Social sharing features

## 📄 License

Private Project - All Rights Reserved

## 👨‍💻 Author

**Souvik Mahanty**
- GitHub: [@mahantysouvik](https://github.com/mahantysouvik)
- Company: Infoedge

---

**Best Moments** - Capture, Share, Cherish 💝