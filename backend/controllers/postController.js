const Post = require('../models/postModel')
const User = require('../models/userModel')

exports.posts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate("user", "username name")
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}

exports.userPosts = async (req, res) => {
    try {
       const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 })
        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
exports.create = async (req, res) => {
    try {
        const { content } = req.body
        const post = await Post.create({
            content,
            user: req.user.id
        })
        res.status(201).json({ success: true, data: post })
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await post.deleteOne()
        res.status(200).json({ message: "deleted successfully" })

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}
exports.edit = async (req, res) => {
    try {
        const { id } = req.params
        const { content } = req.body
        const post = await Post.findById(id)
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
         const newPost = await Post.findByIdAndUpdate(
            id,
            { content },
            { new: true }
        );
        res.status(200).json(newPost)

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}