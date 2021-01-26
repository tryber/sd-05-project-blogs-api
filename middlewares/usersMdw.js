const { User } = require('../models');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validateName = async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return next(
      new CodeError('"displayName" length must be at least 8 characters long', 'invalid_data'),
    );
  }
  // invalid_data for status 400 in the error middleware
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new CodeError('"email" is required', 'invalid_data'));
  }
  // const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  // Do Felipinho
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  // Do cookmaster
  if (!emailRegex.test(email)) {
    return next(new CodeError('"email" must be a valid email', 'invalid_data'));
  }
  next();
};

const validateNotExisting = async (req, _res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    // return res.status(409).json({message:'Usuário já existe' });
    // easy solution in case error middleware and promise would fail
    // throw new CodeError('Usuário já existe', 'conflict');
    // throw would launch an error to be treated later
    return next(new CodeError('Usuário já existe', 'conflict'));
    // successfully sends it to error middleware
  }
  // conflict for status 409
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return next(new CodeError('"password" is required', 'invalid_data'));
  }
  if (password.length < 6) {
    return next(new CodeError('"password" length must be 6 characters long', 'invalid_data'));
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
};
