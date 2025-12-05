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

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

*Generated on 2025‑12‑05 by Antigravity – your AI coding assistant.*
