const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const authMiddleware = require("../middleware/authMiddleware")

router.get('/', postController.posts)
router.get('/myposts', postController.userPosts)
router.post('/', authMiddleware, postController.create)
router.delete('/:id', authMiddleware, postController.delete)
router.put('/:id', authMiddleware, postController.edit)

module.exports = router