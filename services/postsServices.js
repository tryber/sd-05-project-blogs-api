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

module.exports = {
  // login,
  getAll,
  // getById,
  create,
  // update,
  // exclude,
};
