const emailService = require('../services/email');
const nameService = require('../services/name');
const passwordService = require('../services/password');

const userMiddleware = async (req, res, next) => {
  const validatedEmail = await emailService(req);
  if (validatedEmail) {
    return res.status(validatedEmail.err.status).json(validatedEmail.err);
  }
  const validatedName = await nameService(req);
  if (validatedName) {
    return res.status(validatedName.err.status).json(validatedName.err);
  }
  const validatedPassword = await passwordService(req);
  if (validatedPassword) {
    return res.status(validatedPassword.err.status).json(validatedPassword.err);
  }

  next();
};

module.exports = userMiddleware;
