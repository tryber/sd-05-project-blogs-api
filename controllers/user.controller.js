const { Router } = require('express');
const { userServices } = require('../services');

const user = Router();

const TOKEN_NOT_FOUND = {
  name: 'TokenNotFoundError',
  message: 'Token não encontrado',
  status: 401,
};

const INVALID_TOKEN = {
  name: 'InvalidTokenError',
  message: 'Token expirado ou inválido',
  status: 401,
};

user.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const token = await userServices.registerUser(
      displayName,
      email,
      password,
      image,
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

user.get('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(TOKEN_NOT_FOUND);

    const users = await userServices.findAllUsers(token);

    res.status(200).json(users);
  } catch (error) {
    if (error.message === 'jwt malformed') return next(INVALID_TOKEN);
    next(error);
  }
});

module.exports = user;
