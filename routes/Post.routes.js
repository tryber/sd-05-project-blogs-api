const express = require('express');
const PostController = require('../controllers/Post.controller');
const PostMid = require('../middlewares/PostMiddlewares');
const AuthMid = require('../middlewares/AuthMiddlewares');

const router = express.Router();

router.get('/', AuthMid.tokenNotExists, AuthMid.tokenIsValid, PostController.getPosts);
router.post('/', AuthMid.tokenNotExists, AuthMid.tokenIsValid, PostMid.verifyPost, PostController.createPost);

module.exports = router;
