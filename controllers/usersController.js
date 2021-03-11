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
    const token = await createToken(user);
    return res.status(201).json({ token });
  } catch {
    throw new Error('Usuário já existe|409');
  }
}));

userRouter.get('/', validateToken, rescue(async (_req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
}));

module.exports = userRouter;
