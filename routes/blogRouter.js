const express = require('express');

const middlewares = require('../middlewares');


const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  res.send();
});

blogRouter.post('/user', middlewares.createUserValidation);

module.exports = blogRouter;
