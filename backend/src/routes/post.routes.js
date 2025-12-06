const express = require("express")
const { createPostController } = require("../controllers/post.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer")

const router = express.Router()

const upload = multer({ dest: '/tmp/uploads/' })

/* POST /api/posts [protected] */
router.post("/",
    /* authMiddleware,  req.user = userData */
    upload.single("file"), /* req.file = file */
    createPostController
)

module.exports = router