const postModel = require("../models/post.model")
const { generateCaption } = require("../service/ai.service")
const {v4: uuidv4} = require("uuid")
const { uploadImage } = require("../service/storage.service")

async function createPostController(req, res){
    const file = req.file
    console.log("File received",file)

    const base64ImageFile = new Buffer.from(file.buffer).toString("base64")

    const caption = await generateCaption(base64ImageFile)
    const result = await uploadImage(file.buffer, `${uuidv4()}`)

    const post = await postModel.create({
        image: result,
        caption: caption,
        user: req.user._id
    })

    res.status(201).json({
        post
    })
}

module.exports = {
    createPostController
}