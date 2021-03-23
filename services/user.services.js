const Joi = require('@hapi/joi');
const { createToken } = require('../auth/jwt.auth');
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

// no password leak
const treatData = (id, displayName, email, image) => ({
  id,
  displayName,
  email,
  image,
});

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

  const { dataValues } = newUser;
  const treatedData = treatData(dataValues);
  return createToken(treatedData);
};

module.exports = {
  registerUser,
};
