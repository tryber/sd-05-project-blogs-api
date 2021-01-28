const express = require('express');
const { usersController } = require('../controllers');
const { createUserValidation, tokenValidation } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', createUserValidation, usersController.create);

userRouter.get('/:id', tokenValidation, usersController.show);

userRouter.get('/', tokenValidation, usersController.index);

userRouter.delete('/me', tokenValidation, usersController.remove);

module.exports = userRouter;
