const express = require('express');
const { usersControllers } = require('../controllers');
const { userValidation } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', userValidation, usersControllers.create);

module.exports = userRouter;
