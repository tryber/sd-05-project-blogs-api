const Joi = require('joi');
const { Users } = require('../models');

const verifyCreate = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  });
  try {
    await schema.validateAsync({ displayName, email, password });
    const emailFound = await Users.findOne({ where: { email } });
    if (emailFound) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
    return next();
  } catch (e) {
    if (e) {
      const { details } = e;
      res.status(400).json({ message: details[0].message });
    }
  }
};

const verifyLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(6).required(),
  });
  try {
    await schema.validateAsync({ email, password });
    const emailFound = await Users.findOne({ where: { email } });
    if (!emailFound) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    return next();
  } catch (e) {
    if (e) {
      const { details } = e;
      res.status(400).json({ message: details[0].message });
    }
  }
  next();
};

module.exports = {
  verifyCreate,
  verifyLogin,
};
