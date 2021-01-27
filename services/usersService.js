const { User } = require('../models');
const validateDisplayName = require('../utils/validateDisplayName');
const validateEmail = require('../utils/validateEmail');
const validatePassword = require('../utils/validatePassword');

const throwErr = (code, message, statusCode = 400) => ({ error: true, code, message, statusCode });

const createUser = async (displayName, email, password, image) => {
  if (!validateDisplayName(displayName)) return throwErr('bad-request-name', '"displayName" length must be at least 8 characters long');

  if (!email) return throwErr('bad-request', '"email" is required');

  if (!validateEmail(email)) return throwErr('bad-request', '"email" must be a valid email');

  if (!password) return throwErr('bad-request', '"password" is required');

  if (!validatePassword(password)) return throwErr('bad-request', '"password" length must be 6 characters long');

  const userAlreadyExists = await User.findOne({ where: { email } });

  if (userAlreadyExists) return throwErr('conflict', 'Usuário já existe', 409);

  return User.create({ displayName, email, password, image });
};

const login = async (email, password) => {
  if (email === '') return throwErr('bad-request', '"email" is not allowed to be empty');

  if (password === '') return throwErr('bad-request', '"password" is not allowed to be empty');

  if (!email) return throwErr('bad-request', '"email" is required');

  if (!password) return throwErr('bad-request', '"password" is required');

  const user = await User.findOne({ where: { email } });

  if (!user) return throwErr('bad-request', 'Campos inválidos');

  return user;
};

const getAllUsers = async () => User.findAll();

module.exports = {
  createUser,
  login,
  getAllUsers,
};
