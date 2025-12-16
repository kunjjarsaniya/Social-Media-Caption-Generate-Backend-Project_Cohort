const express = require("express")
const { createPostController } = require("../controllers/post.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const router = express.Router()

const upload = multer({
    dest: '/tmp/uploads/',
    limits: {
        fileSize: 20 * 1024 * 1024 // 20MB limit
    }
})

/* POST /api/posts [protected] */
router.post("/",
    /* authMiddleware,  req.user = userData */
    upload.single("file"), /* req.file = file */
    createPostController
)

// Error handling middleware for multer
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                message: "File too large. Maximum size is 20MB."
            });
        }
        return res.status(400).json({
            message: `Upload error: ${err.message}`
        });
    }
    next(err);
})

module.exports = router