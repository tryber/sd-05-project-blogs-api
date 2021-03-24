const express = require('express');

const middlewares = require('../middlewares');
const controllers = require('../controllers');

const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  res.send();
});

blogRouter.post('/user', middlewares.createUserValidation, controllers.createUser);
blogRouter.post('/login', middlewares.loginValidation);
module.exports = blogRouter;
