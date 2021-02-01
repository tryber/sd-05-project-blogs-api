const express = require('express');
const MiddleErrorUser = require('../middlewares/middlewareErrorUser');
const MiddleToken = require('../middlewares/tokenMiddleware');
const MiddleDisplayName = require('../middlewares/validDisplayName');
const MiddleEmail = require('../middlewares/validEmail');
const MiddlePassword = require('../middlewares/validPassword');
const { User } = require('../models');
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
    const result = await User.create({ displayName, email, password });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

userRouter.get('/:id', MiddleToken, async (req, res, next) => {
  const { id } = req.params;
  const result = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!result) return next({ status: 404, message: 'Usuário não existe' });
  res.status(200).json(result);
});

userRouter.get('/', MiddleToken, async (req, res) => {
  const result = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(result);
});

userRouter.delete('/me', MiddleToken, async (req, res) => {
  const user = req.payload;
  await User.destroy({ where: { id: user.id } });
  return res.status(204).json();
});

userRouter.use(MiddleErrorUser);

module.exports = userRouter;
