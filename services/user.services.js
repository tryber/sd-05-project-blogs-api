const Joi = require('@hapi/joi');
const { createToken, checkToken } = require('../auth/jwt.auth');
const { User } = require('../models');

const REGISTER_SCHEMA = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

const INVALID_DATA = (message) => ({
  name: 'InvalidDataError',
  message,
  status: 400,
});

const USER_CONFLICT = {
  name: 'UserConflictError',
  message: 'Usuário já existe',
  status: 409,
};

const USER_NOT_FOUND = {
  name: 'UserNotFoundError',
  message: 'Usuário não existe',
  status: 404,
};

const registerUser = async (displayName, email, password, image) => {
  const { error } = REGISTER_SCHEMA.validate({
    displayName,
    email,
    password,
    image,
  });

  if (error) throw INVALID_DATA(error.message);

  const userFound = await User.findOne({ where: { email } });

  if (userFound) throw USER_CONFLICT;

  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });

  const { password: _password, ...treatedData } = newUser.dataValues;
  return createToken(treatedData);
};

const findAllUsers = async (token) => {
  checkToken(token);

  const usersFound = await User.findAll();

  const treatedUsers = usersFound.map((user_) => {
    const { password, ...treatedData } = user_.dataValues;
    return treatedData;
  });

  return treatedUsers;
};

const findUserById = async (id, token) => {
  checkToken(token);

  const userFound = await User.findOne({ where: { id } });

  if (!userFound) throw USER_NOT_FOUND;

  const { password, ...treatedUser } = userFound.dataValues;

  return treatedUser;
};

module.exports = {
  findAllUsers,
  findUserById,
  registerUser,
};
