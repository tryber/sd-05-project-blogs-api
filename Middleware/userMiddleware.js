const joi = require('@hapi/joi');
const rescue = require('express-rescue');
const { User } = require('../models');

const USER_SCHEMA = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().length(6).required(),
  image: joi.string().required(),
});

const validateUserEntries = async (req, res, next) => {
  const { error } = USER_SCHEMA.validate(req.body);

  if (error) next({ message: error.details[0].message, status: 400 });
  next();
};

const validateIfEmailIsNotDuplicate = rescue(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) next({ message: 'Usuário já existe', status: 409 });
});

module.exports = { validateUserEntries, validateIfEmailIsNotDuplicate };
