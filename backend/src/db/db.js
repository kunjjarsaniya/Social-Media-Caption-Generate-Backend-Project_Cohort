const mongoose = require("mongoose")

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            // console.log("MongoDB connected")
        })
        .catch((err) => {
            // console.log("MongoDB connection failed (App will run without DB):", err.message)
        })
}

module.exports = connectDB