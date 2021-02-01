const { User } = require('../models');

const verifyLogin = async (email, password) => {
  if (email === undefined) return { error: true, message: '"email" is required', code: 400 };
  if (!email) return { error: true, message: '"email" is not allowed to be empty', code: 400 };
  if (password === undefined) return { error: true, message: '"password" is required', code: 400 };
  if (!password) return { error: true, message: '"password" is not allowed to be empty', code: 400 };
  const verifyUser = await User.findOne({ where: { email, password }, attributes: ['id', 'email', 'displayName'] });
  if (!verifyUser) return { error: true, message: 'Campos inválidos', code: 400 };
  return verifyUser;
};

module.exports = {
  verifyLogin,
};
