const emailService = require('../services/email');
const nameService = require('../services/name');
const passwordService = require('../services/password');

const postMiddleware = async (req, res, next) => {
  const nameValid = await nameService(req);
  if (nameValid) return res.status(nameValid.err.status).json(nameValid.err);

  const emailValid = await emailService(req);
  if (emailValid) return res.status(emailValid.err.status).json(emailValid.err);

  const passwordValid = await passwordService(req);
  if (passwordValid) {
    return res.status(passwordValid.err.status).json(passwordValid.err);
  }

  next();
};

module.exports = postMiddleware;
