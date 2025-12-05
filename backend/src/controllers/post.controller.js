const postModel = require("../models/post.model")
const { generateCaption } = require("../service/ai.service")
const { v4: uuidv4 } = require("uuid")
const { uploadImage } = require("../service/storage.service")
const fs = require("fs")

async function createPostController(req, res) {
    const file = req.file
    // console.log("File received", file)

    // Check for file size (Limit to 20MB for Gemini Inline Data)
    if (file.size > 20 * 1024 * 1024) {
        return res.status(400).json({
            message: "File too large. Please upload videos smaller than 20MB for this demo."
        });
    }

    const fileBuffer = fs.readFileSync(file.path)
    const { mode, language } = req.body;

    const [caption, result] = await Promise.all([
        generateCaption(file.path, mode, language, file.mimetype),
        uploadImage(fileBuffer, `${uuidv4()}`)
    ]);
    // Skip database save since we are in demo mode
    const post = {
        image: result,
        caption: caption,
        _id: "temp-" + Date.now()
    }

    res.status(201).json({
        post
    })
}

module.exports = {
    createPostController
}