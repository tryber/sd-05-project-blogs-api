const displayNameValidation = require('./displayNameValidation');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');
const { User } = require('../models');
const { createToken } = require('../auth/token');

const userPostMiddleware = async (req) => {
  const checkName = await displayNameValidation(req);
  if (checkName) return checkName;

  const checkEmail = await emailValidation(req);
  if (checkEmail) return checkEmail;

  const checkPassword = await passwordValidation(req);
  if (checkPassword) return checkPassword;

  try {
    const { displayName, email, password, image } = req.body;

    const newUser = await User.create({ displayName, email, password, image });
    const token = createToken({ newUser });
    return { token };
  } catch {
    return { err: { status: 500, message: 'Algo deu errado' } };
  }
};

module.exports = userPostMiddleware;
