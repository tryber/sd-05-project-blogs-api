const emailService = require('../services/email');
const nameService = require('../services/name');
const passwordService = require('../services/password');
const { User } = require('../models');
const { getToken } = require('./authentication');

const userMiddleware = async (req) => {
  const validatedEmail = await emailService(req);
  if (validatedEmail) {
    return validatedEmail;
  }
  const validatedName = await nameService(req);
  if (validatedName) {
    return validatedName;
  }
  const validatedPassword = await passwordService(req);
  if (validatedPassword) {
    return validatedPassword;
  }

  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });
    const token = getToken(newUser);
    return { token };
  } catch {
    return { err: { message: 'Algo deu errado', status: 500 } };
  }
};

module.exports = userMiddleware;
