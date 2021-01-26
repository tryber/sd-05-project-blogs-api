const services = require('../services');

const userPostMiddleware = async (req, res, next) => {
  const checkName = await services.displayNameValidation(req);
  if (checkName.err) return res.status(err.status).json(err.message);

  const checkEmail = await services.emailValidation(req);
  if (checkEmail.err) return res.status(err.status).json(err.message);

  const checkPassword = await services.passwordValidation(req);
  if (checkPassword.err) return res.status(err.status).json(err.message);

  next();
};

module.exports = userPostMiddleware;
