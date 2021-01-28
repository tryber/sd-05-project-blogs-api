const services = require('../services');

const postUserValidation = async (req, res, next) => {
  const nameValidation = await services.displayNameValidation(req);
  if (nameValidation) return res.status(nameValidation.err.status).json(nameValidation.err);

  const emailValidation = await services.emailValidation(req);
  if (emailValidation) return res.status(emailValidation.err.status).json(emailValidation.err);

  const passwordValidation = await services.passwordValidation(req);
  if (passwordValidation) {
    return res.status(passwordValidation.err.status).json(passwordValidation.err);
  }

  next();
};

module.exports = postUserValidation;
