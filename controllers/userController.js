const { Router } = require('express');
const rescue = require('express-rescue');
const verifyToken = require('../middleware/verifyToken');
const { User } = require('../models');

const userRouter = Router();

userRouter.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await User.create({ displayName, email, password, image });

  return res.status(201).json(newUser);
}));

userRouter.get('/', verifyToken, rescue(async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
}));

userRouter.get('/:id', verifyToken, rescue(async (req, res) => {
  const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });

  return res.status(200).json(user);
}));

userRouter.delete('/me', verifyToken, async (req, res) => {
  const { id } = req.payload.userWithoutPassword;

  await User.destroy({ where: { id } });

  return res.status(204).json();
});

module.exports = userRouter;
