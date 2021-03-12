const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');
const validateToken = require('../middleware/validaToken');
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
    const token = await createToken(user.dataValues);
    return res.status(201).json({ token });
  } catch {
    throw new Error('Usuário já existe|409');
  }
}));

// GET /user/-> Comportamento de getALL
userRouter.get('/', validateToken, rescue(async (_req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
}));

// GET /user/:id -> Comportamento de getById
userRouter.get('/:id', validateToken, rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não existe|404');
    res.status(200).json(user);
  } catch {
    throw new Error('Usuário não existe|404');
  }
}));

userRouter.delete('/me', validateToken, async (req, res) => {
  const user = req.payload;
  await User.destroy({ where: { id: user.id } });
  return res.status(204).send();
});

module.exports = userRouter;
