const { Users } = require('../models');
const { createToken, verifyToken } = require('../middlewares/JWToken');

const returnMsg = (errorMessage) => ({ error: true, code: 'Bad Request', message: errorMessage });

const create = async (body) => {
  const { displayName, email, password, image } = body;
  if (!/^[A-Za-z \s]{8,}$/.test(displayName) || !displayName) {
    return returnMsg('"displayName" length must be at least 8 characters long');
  }
  if (!email) { return returnMsg('"email" is required'); }
  if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i.test(email)) {
    return returnMsg('"email" must be a valid email');
  }
  if (!password) { return returnMsg('"password" is required'); }
  if (password.length < 6) { return returnMsg('"password" length must be 6 characters long'); }
  const emailExists = await Users.findOne({ where: { email } });
  if (emailExists) {
    return {
      error: true,
      code: 'Conflict',
      message: 'Usuário já existe',
    };
  }
  await Users.create({ displayName, email, password, image });
  const token = createToken({ displayName, email });
  return token;
};

const login = async (body) => {
  const { email, password } = body;
  if (email === '') { return returnMsg('"email" is not allowed to be empty'); }
  if (password === '') { return returnMsg('"password" is not allowed to be empty'); }
  if (!email) { return returnMsg('"email" is required'); }
  if (!password) { return returnMsg('"password" is required'); }
  const user = await Users.findOne({ where: { email } });
  // console.log(user);
  if (!user || user.password !== password) {
    return {
      error: true,
      code: 'Bad Request',
      message: 'Campos inválidos',
    };
  }
  const { password: _, ...userWithoutPassword } = user;
  // console.log(userWithoutPassword);
  const token = createToken({ userWithoutPassword });
  // console.log(token);
  return token;
};

const getAll = async (token) => {
  if (!token) {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Token não encontrado',
    };
  }
  const validateToken = verifyToken(token);
  console.log(validateToken);
  if (validateToken === 'jwt malformed') {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Token expirado ou inválido',
    };
  }
  const allUsers = await Users.findAll();
  // const { password: _, ...userData } = allUsers;
  // não precisa tirar password?
  return allUsers;
};

const getById = async (token, id) => {
  if (!token) {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Token não encontrado',
    };
  }
  const validateToken = verifyToken(token);
  if (validateToken === 'jwt malformed') {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Token expirado ou inválido',
    };
  }
  const getUser = await Users.findOne({ where: { id } });
  if (!getUser) {
    return { error: true, code: 'Not Found', message: 'Usuário não existe' };
  }
  const { displayName, email, image } = getUser;
  return { id, displayName, email, image };
};

module.exports = {
  login,
  getAll,
  getById,
  create,
  // update,
  // exclude,
};
