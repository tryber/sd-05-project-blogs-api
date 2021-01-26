const { User } = require('../models')
const { checkName, checkEmail, checkPassword } = require('../utils/validation')

// https://bit.ly/2VxAplp
class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const create = async ({ displayName, email, password }) => {
  if (!checkName(displayName)) {
    throw new CodeError('\"displayName\" length must be at least 8 characters long', 'invalid_data')
  }

  if (!email) {
    throw new CodeError('\"email\" is required', 'invalid_data')
  }

  if (!checkEmail(email)) {
    throw new CodeError('\"email\" must be a valid email', 'invalid_data')
  }

  if (!password) {
    throw new CodeError('\"password\" is required', 'invalid_data')
  }

  if (!checkPassword(password)) {
    throw new CodeError('\"password\" length must be 6 characters long', 'invalid_data')
  }

  return User.create(email, password);
};

module.exports = { create }