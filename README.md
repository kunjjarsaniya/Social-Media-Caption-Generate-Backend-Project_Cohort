# 🎨 CaptionKatha - AI-Powered Social Media Caption Generator

<div align="center">

![CaptionKatha Logo](frontend/public/logo.png)

**Turn Photos into Stories**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://your-frontend.vercel.app)
[![Backend API](https://img.shields.io/badge/api-running-blue)](https://your-backend.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-orange)]()

*An AI-powered caption generator for Instagram, Twitter, and WhatsApp with multilingual support and culturally relevant content generation*

[Live Demo](https://your-frontend.vercel.app) · [Report Bug](https://github.com/kunjjarsaniya/Social-Media-Caption-Generate--Backend-Project_Cohort/issues) · [Request Feature](https://github.com/kunjjarsaniya/Social-Media-Caption-Generate--Backend-Project_Cohort/issues)

</div>

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🌟 About

**CaptionKatha** is a modern web application that leverages AI to generate engaging, culturally relevant captions for social media content. Built with the MERN stack and powered by Google's Gemini AI, it helps content creators save time while maintaining cultural authenticity in their posts.

### Why CaptionKatha?

- ✨ **AI-Powered**: Utilizes Google Gemini AI for intelligent caption generation
- 🌐 **Multilingual**: Supports Hindi, Gujarati, English, and Hinglish
- 🎭 **Multiple Modes**: Funny, Professional, Festive, and more
- 🎨 **Beautiful UI**: Sleek black/gray/white minimalist design
- 📱 **Responsive**: Works seamlessly on mobile, tablet, and desktop
- 🚀 **Fast**: Optimized for performance and quick generation

---

## ✨ Features

### Core Functionality
- 🖼️ **Image & Video Upload**: Drag-and-drop or click to upload
- 🤖 **AI Caption Generation**: Powered by Google Gemini API
- 🎨 **Multiple Modes**: 
  - 😄 Funny (Masti) - Bollywood-style humor
  - 💼 Professional (Vyavsay) - Business-appropriate
  - 🎉 Festive (Tyohar) - Festival-themed
  - 📝 More modes coming soon!
- 🌍 **Language Support**:
  - Hindi (हिंदी)
  - Gujarati (ગુજરાતી)
  - English
  - Hinglish (Hindi + English mix)

### UI/UX Features
- 🎯 **Intuitive Interface**: Clean, easy-to-use design
- 📱 **Mobile-First**: Optimized for mobile devices
- 🌙 **Dark Theme**: eye-catching black/gray/white aesthetic
- ⚡ **Real-time Preview**: See your caption before sharing
- 🎬 **Smooth Animations**: Fade-in effects and transitions
- 🖱️ **Custom Selection Color**: Gray highlight matching the theme

### Technical Features
- 🔐 **Secure**: Environment-based configuration
- 🌐 **RESTful API**: Well-structured backend
- 💾 **MongoDB**: Persistent data storage
- 📡 **CORS Enabled**: Separate frontend/backend deployment
- 🚀 **Vercel Ready**: Production-ready configurations

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 18** - UI library
- ⚡ **Vite** - Build tool and dev server
- 🎨 **CSS3** - Styling with custom properties
- 📦 **Axios** - HTTP client
- 🎭 **Lucide React** - Icon library

### Backend
- 🟢 **Node.js** - Runtime environment
- 🚂 **Express.js** - Web framework
- 🍃 **MongoDB** - Database
- 🔗 **Mongoose** - ODM for MongoDB
- 🤖 **@google/genai** - Gemini AI integration
- 📤 **Multer** - File upload handling
- 🔐 **JWT** - Authentication
- 🔒 **bcryptjs** - Password hashing

### Deployment & Tools
- ▲ **Vercel** - Hosting platform
- 🗄️ **MongoDB Atlas** - Cloud database
- 🔧 **Git** - Version control
- 📝 **ESLint** - Code linting

---

## 📸 Screenshots

### Home Page
![Homepage](docs/screenshots/homepage.png)
*Clean, minimalist interface with upload functionality*

### Caption Generation
![Caption Generation](docs/screenshots/caption-generation.png)
*AI-powered caption with mode and language selection*

### Mobile View
![Mobile Responsive](docs/screenshots/mobile-view.png)
*Fully responsive design for mobile devices*

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kunjjarsaniya/Social-Media-Caption-Generate--Backend-Project_Cohort.git
   cd Social-Media-Caption-Generate--Backend-Project_Cohort
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env-example .env
   # Edit .env and add your credentials
   
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   
   # Create .env file
   echo "VITE_BACKEND_URL=http://localhost:3000" > .env
   
   npm run dev
   ```

4. **Open in browser**
   - Frontend: `http://localhost:5173`
   - Backend:  `http://localhost:3000`

---

## 🌐 Deployment

For detailed deployment instructions, see **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### Quick Deploy to Vercel

**Backend:**
1. Push to GitHub
2. Import in Vercel → select `backend` folder
3. Add environment variables
4. Deploy

**Frontend:**
1. Update `frontend/.env.production` with backend URL
2. Import in Vercel → select `frontend` folder
3. Add `VITE_BACKEND_URL` environment variable
4. Deploy

---

## 📡 API Documentation

### Base URL
```
Production: https://your-backend.vercel.app
Development: http://localhost:3000
```

### Endpoints

#### POST `/api/posts`
Generate AI caption for uploaded media.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `file`: Image or video file
  - `mode`: Caption mode (e.g., "Funny", "Professional")
  - `language`: Language code (e.g., "Hindi", "English")

**Response:**
```json
{
  "success": true,
  "post": {
    "caption": "Generated caption text...",
    "mode": "Funny",
    "language": "Hindi"
  }
}
```

#### POST `/api/auth/register`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}
```

#### POST `/api/auth/login`
Login existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

---

## 📁 Project Structure

```
Day_15_Project/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   │   ├── auth.controller.js
│   │   │   └── post.controller.js
│   │   ├── db/              # Database connection
│   │   │   └── db.js
│   │   ├── middlewares/     # Custom middlewares
│   │   │   └── auth.middleware.js
│   │   ├── models/          # Mongoose models
│   │   │   ├── user.model.js
│   │   │   └── post.model.js
│   │   ├── routes/          # API routes
│   │   │   ├── auth.routes.js
│   │   │   └── post.routes.js
│   │   ├── service/         # Business logic
│   │   │   ├── ai.service.js
│   │   │   └── storage.service.js
│   │   └── app.js           # Express app
│   ├── .env                 # Environment variables
│   ├── server.js            # Entry point
│   ├── package.json
│   └── vercel.json          # Vercel config
│
├── frontend/
│   ├── public/
│   │   ├── logo.png
│   │   ├── og-image.png     # Social media preview
│   │   └── captionkatha_favicon_white.png
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── UploadComponent.jsx
│   │   │   ├── ModeSelector.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── CaptionDisplay.jsx
│   │   ├── pages/           # Page components
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css        # Global styles
│   ├── .env                 # Local development
│   ├── .env.production      # Production config
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json          # Vercel config
│
├── DEPLOYMENT_GUIDE.md      # Deployment instructions
├── PORTFOLIO.mdx            # Portfolio showcase
├── SRS.md                   # Requirements specification
├── PRD.md                   # Product requirements
└── README.md                # This file
```

---

## 🔐 Environment Variables

### Backend `.env`

```plaintext
# Database
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/captionkatha

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars

# AI Service
GEMINI_API_KEY=your-google-gemini-api-key

# CORS - Production Frontend URL
FRONTEND_URL=https://your-frontend.vercel.app

# Optional
PORT=3000
```

### Frontend `.env`

```plaintext
# Development
VITE_BACKEND_URL=http://localhost:3000

# Production (.env.production)
VITE_BACKEND_URL=https://your-backend.vercel.app
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Contact

**Kunj Jarsaniya**

- GitHub: [@kunjjarsaniya](https://github.com/kunjjarsaniya)
- Project Link: [CaptionKatha](https://github.com/kunjjarsaniya/Social-Media-Caption-Generate--Backend-Project_Cohort)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) - AI caption generation
- [MongoDB](https://www.mongodb.com/) - Database
- [Vercel](https://vercel.com/) - Deployment platform
- [React](https://react.dev/) - UI library
- [Express.js](https://expressjs.com/) - Backend framework

---

<div align="center">

**Made with ❤️ for content creators**

⭐ Star this repo if you find it helpful!

</div>
