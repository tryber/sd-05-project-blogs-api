const express = require('express');
const { usersControllers } = require('../controllers');

const userRouter = express.Router();

userRouter.post('/', usersControllers.create);

module.exports = userRouter;
