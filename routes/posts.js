const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts') 
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', ensureAuth, postsController.getPosts)

router.post('/createPost', postsController.createPost)

router.put('/likePost/:id', postsController.likePost)

router.delete('/deletePost', postsController.deletePost)

module.exports = router;
