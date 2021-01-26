const express = require('express');
const userMiddlewares = require('../Middleware/userMiddleware');
const userControllers = require('../Controllers/UserControllers');

const userRouter = express.Router();

userRouter.post(
  '/',

  userMiddlewares.validateUserEntries,
  userMiddlewares.validateIfEmailIsNotDuplicate,
  userControllers.createUser,
);

module.exports = userRouter;
