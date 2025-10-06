const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    content: String,
    user:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
}, { timestamps: true })

module.exports = mongoose.model("Post", PostSchema)