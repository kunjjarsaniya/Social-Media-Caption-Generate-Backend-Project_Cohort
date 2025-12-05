<<<<<<< HEAD
# 📖 Detailed README

## 🚀 Project Overview

**CaptionKatha (formerly Social Media Caption Generator)** is a full‑stack web application that generates creative captions for social media posts. Users can upload images or videos, select a language and mode (e.g., **fun**, **professional**, **inspirational**), and receive AI‑generated captions along with optional voice output, hashtags, and sharing links.

The project showcases:
- **Backend** built with Node.js, Express, and MongoDB.
- **Frontend** using React, Vite, and modern UI/UX design.
- **AI integration** via OpenAI (or similar) for caption generation.
- **Media handling** (image/video upload, preview, size limits).
- **Multilingual support** (English, Hindi, etc.).

## 📂 Repository Structure

```
Day_15_Project/
├─ backend/               # Express server, API routes, services
│   ├─ controllers/       # Request handlers (e.g., post.controller.js)
│   ├─ services/          # Business logic (e.g., ai.service.js)
│   ├─ models/            # Mongoose schemas
│   ├─ routes/            # Express routers
│   └─ .env               # Environment variables (MongoDB URI, API keys)
├─ frontend/              # React/Vite application
│   ├─ src/
│   │   ├─ components/    # UI components (UploadComponent, CaptionDisplay, …)
│   │   ├─ pages/         # Page components (Home, Quiz, …)
│   │   └─ App.jsx        # Root component
│   ├─ public/            # Static assets (favicon, images)
│   └─ index.html         # Entry HTML file (SEO meta tags live here)
├─ README.md              # **This file** – project documentation
└─ package.json           # Root scripts (optional monorepo setup)
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or later) & **npm**
- **MongoDB** instance (local or Atlas)
- **OpenAI API key** (or compatible AI service)

### Steps
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd Day_15_Project
   ```
2. **Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file (copy from .env.example)
   cp .env.example .env
   # Fill in MONGODB_URI, OPENAI_API_KEY, etc.
   npm run dev   # Starts the Express server on http://localhost:5000
   ```
3. **Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev   # Vite dev server on http://localhost:3000
   ```
4. **Open the app**
   Visit `http://localhost:3000` in your browser.

## 📋 Usage Guide

1. **Upload Media** – Click the upload button, select an image or video (max 20 MB). A preview appears.
2. **Select Language & Mode** – Choose the desired language (English, Hindi, etc.) and caption style.
3. **Generate Caption** – Press **Generate**. The AI processes the media and returns:
   - Caption text
   - Suggested hashtags
   - Optional voice‑over (playable audio)
4. **Share** – Use the built‑in share buttons to post directly to Instagram, Twitter, etc.

### Common Commands (CLI)
- `npm run lint` – Run ESLint for code quality.
- `npm run test` – Execute Jest tests (if present).
- `npm run build` – Create production bundles for deployment.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Make your changes and ensure the app still runs.
4. Submit a pull request with a clear description of the change.

**Please follow the existing code style (Prettier + ESLint) and write unit tests for new logic.**

=======
# 🚀 Social Media Caption Generator - Backend API

A Node.js backend application built with **Express.js** and **MongoDB**, featuring user authentication, file uploads, and integration with **Google's Generative AI**.

---

## ✨ Features
- 🔐 **User Authentication**
  - JWT-based authentication
  - Password hashing with **bcryptjs**
  - Protected routes using middleware

- 📁 **File Management**
  - File uploads with **Multer**

- 🤖 **AI Integration**
  - Integration with **Google's Generative AI**
  - AI-powered features (customize as needed)

- 🗃️ **Database**
  - MongoDB with **Mongoose ODM**
  - Schema-based data modeling

---

## 🛠️ Tech Stack

- ⚙️ **Runtime**: Node.js  
- 🧩 **Framework**: Express.js  
- 🗄️ **Database**: MongoDB + Mongoose  
- 🔑 **Authentication**: JWT (JSON Web Tokens)  
- 🤖 **AI**: Google's Generative AI  
- 🌐 **Environment Management**: dotenv  
- 🛡 **Utilities**: bcryptjs, uuid, cookie-parser  

---

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js (v14 or higher)  
- MongoDB (local or Atlas)  
- npm or yarn  

### 📦 Installation

1. 📂 Clone the repository:
   ```bash
   git clone https://github.com/kunjjarsaniya/Social-Media-Caption-Generate--Backend-Project_Cohort.git
   cd Day_15_Project/backend
   ```
   
2. 📥 Install dependencies:
   ```bash
   npm install
   ```
   
3. 🔐 Set up environment variables:
    - Copy `.env-example` to `.env`
    - Update the environment variables with your own configuration

4. 🏁 Start the development server:
   ```bash
   npm start
   ```
   The server will start at: http://localhost:3000

---

## 📁 Project Structure
```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── db/              # Database connection
│   ├── middlewares/     # Custom middlewares
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── service/         # Business logic
│   ├── app.js           # Express app configuration
├── .env                 # Environment variables
├── .env-example         # Example env file
├── package.json
└── server.js            # Server entry point
```

---

## 🔐 Environment Variables
Create a `.env` file in the root directory and include:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_AI_API_KEY=your_google_ai_api_key
```
---

## 🧪 Available Scripts
- `npm start` - Start the server
- `npm run dev` - Start server in dev mode with nodemon (if configured)

---

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (protected)

### 📤 File Upload
- `POST /api/upload` - Upload a file (protected)

### 🤖 AI Services
- `POST /api/ai/generate` - Generate content using Google's AI (protected)

---

## 🤝 Contributing
1. 🍴 Fork the repository

2. 🧪 Create your feature branch
    ```bash
    git checkout -b feature/AmazingFeature
    ```

3. 💾 Commit your changes
    ```bash
    git commit -m "Add some AmazingFeature"
    ```

4. 🚀 Push to the branch
    ```bash
    git push origin feature/AmazingFeature
    ```

5. 📬 Open a Pull Request

---

## 🙏 Acknowledgments
- 💙 Express.js
- 🍃 MongoDB
- 🤖 Google Generative AI
- 🖼 ImageKit

---
>>>>>>> 
