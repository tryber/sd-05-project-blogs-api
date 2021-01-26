const { User } = require('../models');
const { createToken, checkToken } = require('../Utils/jwtAuth');
const { StatusError } = require('../Utils');

// prettier-ignore
const login = async ({ email = null, password = null }) => {
  if (email === null) throw new StatusError('"email" is required', 400);
  if (email === '') throw new StatusError('"email" is not allowed to be empty', 400);

  if (password === null) throw new StatusError('"password" is required', 400);
  if (password === '') throw new StatusError('"password" is not allowed to be empty', 400);

  const user = await User.findOne({ where: { email, password } });
  if (!user) throw new StatusError('Campos inválidos', 400);

  const { password: _, ...userWithoutPassword } = user;
  const token = createToken(userWithoutPassword);

  return token;
};

const authenticateToken = (token) => {
  if (!token) throw new StatusError('Token não encontrado', 401);

  console.log(token);

  try {
    console.log('entrou no try');
    const { password: _, ...userWithoutPassword} = checkToken(token).payload.dataValues;

    return userWithoutPassword;
  } catch (error) {
    if (error.message === 'invalid token') {
      throw new StatusError('Token expirado ou inválido', 401);
    }
  }
};

module.exports = { login, authenticateToken };
