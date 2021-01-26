const services = require('../services');

const userPostMiddleware = async (req, res, next) => {
  const checkName = await services.displayNameValidation(req);
  if (checkName.err) return res.status(checkName.err.status).json(checkName.err);

  const checkEmail = await services.emailValidation(req);
  if (checkEmail.err) return res.status(checkEmail.err.status).json(checkEmail.err);

  const checkPassword = await services.passwordValidation(req);
  if (checkPassword.err) return res.status(checkPassword.err.status).json(checkPassword.err);

  next();
};

module.exports = userPostMiddleware;
