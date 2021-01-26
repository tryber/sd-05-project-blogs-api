const express = require('express');
const userMiddlewares = require('../Middleware/userMiddleware');
const userControllers = require('../Controllers/UserControllers');
const isAuthorized = require('../Middleware/isAuthorized');

const userRouter = express.Router();

userRouter.post(
  '/',

  userMiddlewares.validateUserEntries,
  userMiddlewares.validateIfEmailIsNotDuplicate,
  userControllers.createUser,
);

userRouter.get(
  '/',

  isAuthorized,
  userControllers.getAll,
);

module.exports = userRouter;
