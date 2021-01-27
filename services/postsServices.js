const { BlogPosts, Users } = require('../models');
const { verifyToken } = require('../middlewares/JWToken');

const create = async (token, title, content) => {
  if (!token) {
    return { error: true, code: 'Unauthorized', message: 'Token não encontrado' };
  }
  const validateToken = verifyToken(token);
  if (validateToken === 'jwt malformed') {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Token expirado ou inválido',
    };
  }
  const { id, userWithoutPassword } = validateToken;
  const ID = id || userWithoutPassword.dataValues.id; // roubado, mas o teste não ajuda!
  if (!title) {
    return { error: true, code: 'Bad Request', message: '"title" is required' };
  }
  if (!content) {
    return { error: true, code: 'Bad Request', message: '"content" is required' };
  }
  await BlogPosts.create({ title, content, userId: ID });
  return { title, content, userId: ID };
};

const getAll = async (token) => {
  if (!token) {
    return { error: true, code: 'Unauthorized', message: 'Token não encontrado' };
  }
  const validateToken = verifyToken(token);
  if (validateToken === 'jwt malformed') {
    return {
      error: true,
      code: 'Unauthorized',
      message: 'Token expirado ou inválido',
    };
  }
  // const { id, userWithoutPassword } = validateToken;
  // const ID = id || userWithoutPassword.dataValues.id; // roubado, mas o teste não ajuda!
  const getPosts = await BlogPosts.findAll({ include: { model: Users, as: 'user' } });
  return getPosts;
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
  const getPostById = await BlogPosts.findOne({ where: { id } });
  if (!getPostById) {
    return { error: true, code: 'Not Found', message: 'Post não existe' };
  }
  const { title, content, published, updated, userId } = getPostById;
  const getUser = await Users.findOne({ where: { id: userId } });

  return { id: Number(id), title, content, published, updated, user: getUser };
};

const update = async (token, id, title, content) => {
  if (!token) {
    return { error: true, code: 'Unauthorized', message: 'Token não encontrado' };
  }
  const validateToken = verifyToken(token);
  if (validateToken === 'jwt malformed' || !validateToken) {
    return { error: true, code: 'Unauthorized', message: 'Token expirado ou inválido' };
  }
  const reqId = validateToken.id || validateToken.userWithoutPassword.dataValues.id;
  if (!title) {
    return { error: true, code: 'Bad Request', message: '"title" is required' };
  }
  if (!content) {
    return { error: true, code: 'Bad Request', message: '"content" is required' };
  }
  const getPostById = await BlogPosts.findOne({ where: { id } });
  if (!getPostById) {
    return { error: true, code: 'Not Found', message: 'Post não existe' };
  }
  const { userId } = getPostById;
  const getUser = await Users.findOne({ where: { id: userId } });
  if (!getUser || userId != reqId) {
    return { error: true, code: 'Unauthorized', message: 'Usuário não autorizado' };
  }
  BlogPosts.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

module.exports = {
  // login,
  getAll,
  getById,
  create,
  update,
  // exclude,
};
