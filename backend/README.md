# 🚀 Social Media Caption Generator - Backend API

A Node.js backend application built with **Express.js** and **MongoDB**, featuring user authentication, file uploads, and integration with **Google's Generative AI**.

---

## ✨ Features

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