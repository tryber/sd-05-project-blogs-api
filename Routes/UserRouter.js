const express = require('express');
const userRouter = express.Router();
const userMiddlewares = require('../Middleware/userMiddleware');
const userControllers = require('../Controllers/UserControllers');

userRouter.post(
  '/',

  userMiddlewares.validateUserEntries,
  userMiddlewares.validateIfEmailIsNotDuplicate,
  userControllers.createUser,
);

module.exports = userRouter;
