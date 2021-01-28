const express = require('express');
const postControllers = require('../Controllers/PostController');
const isAuthorized = require('../Middleware/isAuthorized');

const postRouter = express.Router();

postRouter.post(
  '/',

  isAuthorized,
  postControllers.createPost,
);

postRouter.put(
  '/:id',

  isAuthorized,
  postControllers.editPost,
);

postRouter.delete(
  '/:id',

  isAuthorized,
  postControllers.deletePost,
);

postRouter.get(
  '/',

  isAuthorized,
  postControllers.getAll,
);

postRouter.get(
  '/search',

  isAuthorized,
  postControllers.searchPostThatHasTerm,
);

postRouter.get(
  '/:id',

  isAuthorized,
  postControllers.getPostById,
);

module.exports = postRouter;
