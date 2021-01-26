const rescue = require('express-rescue');
const { User } = require('../models');

// Utilidades
const {
  REGISTER_SCHEMA,
  validate,
} = require('../utils/validation.util');
const { createToken } = require('../utils/jwt.util');

const getAllUsers = async (req, _res, next) => {
  const users = await User.findAll();
  req.data = users;
  next();
};

const registerUser = rescue(async (req, _res, next) => {
  validate(REGISTER_SCHEMA)(req.body);
  try {
    const { id } = await User.create(req.body);
    req.data = { token: createToken(id) };
    next();
  } catch {
    throw new Error('Usuário já existe;409');
  }
});

module.exports = {
  registerUser,
  getAllUsers,
};
