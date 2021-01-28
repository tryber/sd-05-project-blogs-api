const express = require('express');
const MiddleErrorUser = require('../middlewares/middlewareErrorUser');
const MiddleDisplayName = require('../middlewares/validDisplayName');
const MiddleEmail = require('../middlewares/validEmail');
const MiddlePassword = require('../middlewares/validPassword');
const { Users } = require('../models');
const { existEmail } = require('../services/userService');

const userRouter = express.Router();

const middleWareUser = [MiddleDisplayName, MiddleEmail, MiddlePassword];

userRouter.post('/', middleWareUser, async (req, res, next) => {
  const { displayName, email, password } = req.body;
  try {
    const isEmailUsed = await existEmail(email);
    if (isEmailUsed.isError) {
      return next({ ...isEmailUsed, isError: undefined });
    }
    const result = await Users.create({ displayName, email, password });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

userRouter.use(MiddleErrorUser);

module.exports = userRouter;
