const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const authMiddleware = require("../middleware/authMiddleware")

router.get('/', postController.posts)
router.get('/myposts', authMiddleware, postController.userPosts)
router.post('/', authMiddleware, postController.create)
router.get('/:id', authMiddleware, postController.post)
router.delete('/:id', authMiddleware, postController.delete)
router.put('/:id', authMiddleware, postController.edit)
router.put('/like/:id', authMiddleware, postController.like);

module.exports = router