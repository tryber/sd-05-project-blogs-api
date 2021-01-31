const { User } = require('../models');
const emailMid = require('../middlewares/validateEmail');

const create = async (displayName, email, password, image) => {
  if (!displayName) return { error: true, message: '"displayName" is required', code: 400 };
  if (displayName.length < 8) {
    return {
      error: true,
      message: '"displayName" length must be at least 8 characters long',
      code: 400,
    };
  }
  const validEmail = emailMid.verificaEmail(email);
  if (!email) return { error: true, message: '"email" is required', code: 400 };
  if (!validEmail) {
    return { error: true, message: '"email" must be a valid email', code: 400 };
  }
  const existentUser = await User.findOne({ where: { email } });
  if (existentUser) {
    return { error: true, message: 'Usuário já existe', code: 409 };
  }
  if (!password) return { error: true, message: '"password" is required', code: 400 };
  if (password.length < 6) {
    return { error: true, message: '"password" length must be 6 characters long', code: 400 };
  }
  return User.create({ displayName, email, password, image });
};

module.exports = {
  create,
};
