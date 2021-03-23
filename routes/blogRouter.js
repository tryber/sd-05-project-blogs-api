const express = require('express');

const middlewares = require('../middlewares');
const controllers = require('../controllers');


const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  res.send();
});

blogRouter.get('/user/:id', controllers.userById);

module.exports = blogRouter;
