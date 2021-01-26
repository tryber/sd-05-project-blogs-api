const { User } = require('../models');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validateLoginEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === null) {
    return next(new CodeError('"email" is required', 'invalid_data'));
  }
  if (email === '') {
    return next(new CodeError('"email" is not allowed to be empty', 'invalid_data'));
  }
  next();
};

const validateExistingEmail = async (req, _res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });
  if (!existingEmail) {
    return next(new CodeError('Campos inválidos', 'invalid_data'));
  }
  next();
};

const validateLoginPassword = async (req, res, next) => {
  const { password } = req.body;
  if (password === null) {
    return next(new CodeError('"password" is required', 'invalid_data'));
  }
  if (password === '') {
    return next(new CodeError('"password" is not allowed to be empty', 'invalid_data'));
  }
  next();
};

module.exports = {
  validateLoginEmail,
  validateExistingEmail,
  validateLoginPassword,
};
