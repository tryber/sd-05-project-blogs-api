const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');

const createToken = require('../services/createToken');

const {
  LOGIN_SCHEMA,
  validate,
} = require('../utils/validation');

const userRouter = express.Router();

userRouter.post('/', rescue(async (req, res, next) => {
  const { email, password } = req.body;
  validate(LOGIN_SCHEMA)({ email, password });
  try {
    const existingUser = await User.findOne({ where: { email } });
    const login = { ...existingUser.dataValues };
    console.log('LOGINNNNN', login);
    const token = await createToken(login);
    res.status(200).json({ token });
    next();
  } catch {
    throw new Error('Campos inválidos|400');
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
