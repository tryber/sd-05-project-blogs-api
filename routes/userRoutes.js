const express = require('express');
const { usersControllers } = require('../controllers');
const { createUserValidation, tokenValidation } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', createUserValidation, usersControllers.create);

userRouter.get('/:id', tokenValidation, usersControllers.show);

userRouter.get('/', tokenValidation, usersControllers.index);

userRouter.delete('/me', tokenValidation, usersControllers.remove);

module.exports = userRouter;
