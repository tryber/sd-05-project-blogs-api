const express = require('express');
const PostController = require('../controllers/Post.controller');
const PostMid = require('../middlewares/PostMiddlewares');
const AuthMid = require('../middlewares/AuthMiddlewares');

const router = express.Router();

router.get(
  '/',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  PostController.getPosts,
);
router.get(
  '/search',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  PostController.searchPost,
);
router.get(
  '/:id',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  PostMid.verifyPostId,
  PostController.getPostById,
);
router.post(
  '/',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  PostMid.verifyPost,
  PostController.createPost,
);
router.put(
  '/:id',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  PostMid.verifyPost,
  PostMid.verifyPostOwner,
  PostController.updatePost,
);
router.delete(
  '/:id',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  PostMid.verifyPostId,
  PostMid.verifyPostOwner,
  PostController.deletePost,
);

module.exports = router;
