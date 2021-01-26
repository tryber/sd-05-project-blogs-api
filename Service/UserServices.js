const { User } = require('../models');
const { createToken } = require('../Middleware/jwtAuth');

class CodeError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const login = async ({ email = null, password = null }) => {
  if (email === null) throw new CodeError('"email" is required', 400);
  if (email === '') throw new CodeError('"email" is not allowed to be empty', 400);

  if (password === null) throw new CodeError('"password" is required', 400);
  if (password === '') throw new CodeError('"password" is not allowed to be empty', 400);

  const user = await User.findOne({ where: { email, password } });
  if (!user) throw new CodeError('Campos inválidos', 400);

  const { password: _, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);

  return token;
};

module.exports = { login };
