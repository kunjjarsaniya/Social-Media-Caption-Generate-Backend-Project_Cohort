const express = require('express')
const authRoutes = require("./routes/auth.routes")
const postRoutes = require("./routes/post.routes")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

// CORS configuration - allow frontend to communicate with backend
// Supports both local development and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://captionkatha.vercel.app',
    process.env.FRONTEND_URL // Add your production frontend URL as environment variable
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)

module.exports = app
// middlewares