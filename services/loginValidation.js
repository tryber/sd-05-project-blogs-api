const { User } = require('../models');

const loginValidation = async (req) => {
  const { email, password } = req.body;

  if (email === '') return { err: { status: 400, message: '"email" is not allowed to be empty' } };

  if (!email) return { err: { status: 400, message: '"email" is required' } };

  if (password === '') return { err: { status: 400, message: '"password" is not allowed to be empty' } };

  if (!password) return { err: { status: 400, message: '"password" is required' } };

  const user = await User.findOne({ where: { email } });

  if (!user) return { err: { status: 400, message: 'Campos inválidos' } };

  if (user.password !== password) return { err: { status: 400, message: 'Campos inválidos' } };

  return user;
};

module.exports = loginValidation;
