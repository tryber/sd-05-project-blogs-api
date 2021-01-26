const { User } = require('../models');
const { createToken } = require('../Middleware/jwtAuth');

const login = async ({ email, password }, next) => {
  if (!email) next({ message: '"email" is not allowed to be empty', status: 400 });
  if (!password) next({ message: '"password" is not allowed to be empty', status: 400 });

  const user = await User.findOne({ where: { email, password } });
  if (!user) next({ message: 'Campos inválidos', status: 400 });

  const { password: _, ...userWithoutPassword } = user;

  
};

module.exports = { login };
