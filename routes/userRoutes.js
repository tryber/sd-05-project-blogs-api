const express = require('express');
const { usersControllers } = require('../controllers');
const { createUserValidation, tokenValidation } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', createUserValidation, usersControllers.create);

userRouter.get('/', tokenValidation, usersControllers.list);

userRouter.get('/:id', tokenValidation, usersControllers.show);

module.exports = userRouter;
