const rescue = require('express-rescue');
const { User } = require('../models');

// Utilidades
const {
  REGISTER_SCHEMA,
  LOGIN_SCHEMA,
  validate,
} = require('../utils/validation.util');
const {
  createToken,
  digestToken,
} = require('../utils/jwt.util');

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

const loginUser = rescue(async (req, _res, next) => {
  validate(LOGIN_SCHEMA)(req.body);
  try {
    const { id } = await User.findOne({ where: { ...req.body } });
    req.data = { token: createToken(id) };
    next();
  } catch {
    throw new Error('Campos inválidos;400');
  }
});

const getUser = rescue(async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    await digestToken(token);
    const { id } = req.params;
    const { displayName, email, image } = await User.findByPk(id);
    req.data = { id: Number(id), displayName, email, image };
    next();
  } catch ({ message }) {
    switch (message) {
      case 'jwt must be provided':
        throw new Error('Token não encontrado;401');
      case 'jwt malformed':
        throw new Error('Token expirado ou inválido;401');
      default:
        console.error(message);
        throw new Error('Usuário não existe;404');
    };
  }
});

const getAllUsers = rescue(async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;
    await digestToken(token);
    const userList = await User.findAll();
    req.data = userList.map(
      ({ id, displayName, email, image }) => ({ id, displayName, email, image }),
    );
    next();
  } catch ({ message }) {
    switch (message) {
      case 'jwt must be provided':
        throw new Error('Token não encontrado;401');
      case 'jwt malformed':
        throw new Error('Token expirado ou inválido;401');
      default:
        throw new Error('Erro desconhecido;401');
    };
  }
});

module.exports = {
  loginUser,
  registerUser,
  getAllUsers,
  getUser,
};
