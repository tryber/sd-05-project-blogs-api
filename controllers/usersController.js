const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');
const validaToken = require('../middleware/validaToken');
const createToken = require('../services/createToken');

const {
  CREATE_USER_SCHEMA,
  validate,
} = require('../utils/validation');

const userRouter = express.Router();

userRouter.post('/', rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  validate(CREATE_USER_SCHEMA)({ displayName, email, password, image });
  try {
    const user = await User.create({ displayName, email, password, image });
    const token = await createToken(user);
    return res.status(201).json({ token });
  } catch {
    throw new Error('Usuário já existe|409');
  }
}));

// GET /user/-> Comportamento de getALL
userRouter.get('/', validaToken, rescue(async (_req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
}));

// GET /user/:id -> Comportamento de getById
userRouter.get('/:id', validaToken, rescue(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) res.status(404).json({ message: 'Usuário não existe' });
  res.status(200).json(user);
}));

userRouter.delete('/me', validaToken, rescue(async (req, res) => {
  const { email } = req.userPayload;
  await User.destroy({ where: { email } });
  return res.status(204).send();
}));

module.exports = userRouter;
