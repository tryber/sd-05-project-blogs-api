const express = require('express');

// const middlewares = require('../middlewares');
// const createUserController = require('../controllers/createUserController');

const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  res.send();
});

// blogRouter.post('/user', middlewares.createUserValidation, createUserController);

module.exports = blogRouter;
