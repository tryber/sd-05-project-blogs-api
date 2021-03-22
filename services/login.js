const { User } = require('../models');

const loginValid = async (req) => {
  const { email, password } = req.body;

  if (email === '') return { err: { status: 400, message: '"email" is not allowed to be empty' } };

  if (!email) return { err: { status: 400, message: '"email" is required' } };

  if (password === '') return { err: { status: 400, message: '"password" is not allowed to be empty' } };

  if (!password) return { err: { status: 400, message: '"password" is required' } };

  const loginUser = await User.findOne({ where: { email } });

  if (!loginUser) return { err: { status: 400, message: 'Campos inválidos' } };

  if (loginUser.password !== password) return { err: { status: 400, message: 'Campos inválidos' } };

  return loginUser;
};

module.exports = loginValid;
