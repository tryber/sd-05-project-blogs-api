const { User } = require('../models');

const find = async (email, password) => {
  if (email === undefined) {
    return { error: true, message: '"email" is required', statusCode: 400 };
  }
  if (password === undefined) {
    return { error: true, message: '"password" is required', statusCode: 400 };
  }
  if (!email) {
    return { error: true, message: '"email" is not allowed to be empty', statusCode: 400 };
  }
  if (!password) {
    return { error: true, message: '"password" is not allowed to be empty', statusCode: 400 };
  }
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists === null) {
    return { error: true, message: 'Campos inválidos', statusCode: 400 };
  }
  return User.findOne({ email, password });
};

module.exports = {
  find,
};
