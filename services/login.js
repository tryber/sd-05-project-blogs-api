const Joi = require('@hapi/joi');
const { User } = require('../models');
const { createToken } = require('../auth/jwt.auth');

const LOGIN_SCHEMA = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const login = async (email, passwordParam) => {
  const { error } = LOGIN_SCHEMA.validate({
    email,
    password: passwordParam,
  });
  if (error) {
    throw new Error(error.message);
  }

  const user = await User.findOne({ where: { email } });
  if (!user || user.dataValues.password !== passwordParam) {
    throw new Error('Campos inválidos');
  }
  const { dataValues } = user;
  const { password, ...dataValuesTreated } = dataValues;
  return createToken(dataValuesTreated);
};

module.exports = {
  login,
};
