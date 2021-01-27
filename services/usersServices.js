const { User } = require('../models');
const { checkName, checkEmail, checkPassword } = require('../utils/validation');

// https://bit.ly/2VxAplp
class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
const checkData = (displayName, email, password) => {
  if (!checkName(displayName)) {
    throw new CodeError('"displayName" length must be at least 8 characters long', 'invalid_data');
  }

  if (!email) {
    throw new CodeError('"email" is required', 'invalid_data');
  }

  if (!checkEmail(email)) {
    throw new CodeError('"email" must be a valid email', 'invalid_data');
  }

  if (!password) {
    throw new CodeError('"password" is required', 'invalid_data');
  }

  if (!checkPassword(password)) {
    throw new CodeError('"password" length must be 6 characters long', 'invalid_data');
  }
};

const create = async ({ displayName, email, password }) => {
  checkData(displayName, email, password);

  const thisEmailAlreadyExists = await User.findOne({ where: { email } });
  if (thisEmailAlreadyExists) {
    throw new CodeError('Usuário já existe', 'invalid_entries');
  }

  return User.create({ displayName, email, password, image });
};

module.exports = { create };

// User.findOne({
//   where: {
//   [Op.and]: [
//   { email: email.toLowerCase() },
//   { password },
//   ],
//   },
