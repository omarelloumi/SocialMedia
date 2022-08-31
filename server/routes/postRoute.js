const express = require('express');
const { getPosts, createPost, updatePost, deletePost, likePost } = require('../controllers/postController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/',getPosts);

router.post('/',auth,createPost);

router.patch('/:id',auth,updatePost);

router.delete('/:id',auth,deletePost);

router.patch('/:id/likePost',auth,likePost);

module.exports = router;