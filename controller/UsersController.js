const express = require('express');
const rescue = require('express-rescue');
const service = require('../services/userService');
const errMiddleware = require('../middlewares/err');
const { middlewareToken } = require('../middlewares/auth');

const userRouter = express.Router();

userRouter.post('/', async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log('Catch UserController', err);
    next(err);
  }
});

userRouter.get('/', middlewareToken, rescue(async (_req, res) => {
  const users = await service.getAll();

  return res.status(200).json(users);
}));

userRouter.get('/:id', middlewareToken, rescue(async (req, res) => {
  const { id } = req.params;
  const users = await service.getById(id);
  if (users === null) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(users);
}));

userRouter.delete('/me', middlewareToken, rescue(async (req, res) => {
  const { id } = req.payload;
  console.log(id);
  await service.deleteById(id);
  return res.status(204).json();
}));

userRouter.use(errMiddleware.createUserValidator);

module.exports = userRouter;
