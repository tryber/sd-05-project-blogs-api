const express = require('express');
const postControllers = require('../Controllers/PostController');
const isAuthorized = require('../Middleware/isAuthorized');

const postRouter = express.Router();

postRouter.post(
  '/',

  isAuthorized,
  postControllers.createPost,
)

module.exports = postRouter;
