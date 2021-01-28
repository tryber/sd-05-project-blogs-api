const { Router } = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const postsRouter = Router();

postsRouter.post('/', middlewares.auth.auth, controllers.posts.create);

postsRouter.get('/', middlewares.auth.auth, controllers.posts.getAll);

// postsRouter.get('/:id', middlewares.auth.auth, controllers.posts.getById);

// postsRouter.delete('/me', middlewares.auth.auth, controllers.posts.removePost);

module.exports = postsRouter;
