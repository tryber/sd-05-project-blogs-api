const Joi = require('@hapi/joi');
const { createToken } = require('../auth/jwt.auth');
const { User } = require('../models');

const REGISTER_SCHEMA = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().required(),
});

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

  if (error) throw new Error({ message: error.message, status: 400 });

  const userFound = User.find({ email });

  if (userFound) throw new Error({ message: 'Usuário já existe', status: 409 });

  const newUser = User.create({
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
