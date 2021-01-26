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

  try {
    const payload = checkToken(token).payload.dataValues;
    const { password: _, ...userWithoutPassword } = payload;

    return userWithoutPassword;
  } catch (error) {
    if (
      error.message === 'invalid token'
      || error.message === 'jwt malformed'
      || error.message === 'invalid signature'
    ) {
      throw new StatusError('Token expirado ou inválido', 401);
    }
  }
};

const getUser = async (id) => {
  const user = await User.findOne({ where: { id } });

  if (!user) throw new StatusError('Usuário não existe', 404);

  return user;
};

const deleteUser = async (id) => User.destroy({ where: { id } });

module.exports = { login, authenticateToken, getUser, deleteUser };
