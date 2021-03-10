const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');

const createToken = require('../services/createToken');

const {
  CREATE_USER_SCHEMA,
  validate,
} = require('../utils/validationUser');

const userRouter = express.Router();

userRouter.post('/', rescue(async (req, res) => {
  validate(CREATE_USER_SCHEMA)(req.body);
  try {
    const { displayName, email, password, image } = req.body;
    const user = await User.create({ displayName, email, password, image });
    const token = await createToken(user);
    return res.status(201).json({ token });
  } catch {
    throw new Error('Usuário já existe;409');
  }
}));

userRouter.get(
  '/',
  rescue(async (_req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  }),
);

module.exports = userRouter;
