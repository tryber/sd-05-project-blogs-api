const { Op } = require('sequelize');
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
  if (!token) { return { error: true, code: 'Unauthorized', message: 'Token não encontrado' }; }
  const validateToken = verifyToken(token);
  if (validateToken === 'jwt malformed' || !validateToken) {
    return { error: true, code: 'Unauthorized', message: 'Token expirado ou inválido' };
  }
  const reqId = validateToken.id || validateToken.userWithoutPassword.dataValues.id;
  if (!title) {
    return { error: true, code: 'Bad Request', message: '"title" is required' };
  }
  if (!content) { return { error: true, code: 'Bad Request', message: '"content" is required' }; }
  const getPostById = await BlogPosts.findOne({ where: { id } });
  if (!getPostById) { return { error: true, code: 'Not Found', message: 'Post não existe' }; }
  const { userId } = getPostById;
  const getUser = await Users.findOne({ where: { id: userId } });
  if (!getUser || userId !== reqId) {
    return { error: true, code: 'Unauthorized', message: 'Usuário não autorizado' };
  }
  BlogPosts.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

// para o [Op.or] olhei o PR do Paulo D'Andrea => https://sequelize.org/v5/manual/querying.htm 
const getByQuery = async (token, query) => {
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
  };
  // console.log(query);
  const getQueryPosts = await BlogPosts.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${query}%` } },
      { content: { [Op.like]: `%${query}%` } },
    ],
    },
    include: { model: Users, as: 'user' },
  });
  // if(getQueryPosts[0].dataValues) {
  //   return getQueryPosts[0].dataValues.map((post) => {})
  // }
  return getQueryPosts;
};

const exclude = async (token, id) => {
  if (!token) { return { error: true, code: 'Unauthorized', message: 'Token não encontrado' }; }
  const validateToken = verifyToken(token);
  if (validateToken === 'jwt malformed' || !validateToken) {
    return { error: true, code: 'Unauthorized', message: 'Token expirado ou inválido' };
  }
  const reqId = validateToken.id || validateToken.userWithoutPassword.dataValues.id;
  const getPostById = await BlogPosts.findOne({ where: { id } });
  if (!getPostById) { return { error: true, code: 'Not Found', message: 'Post não existe' }; }
  const { userId } = getPostById;
  const getUser = await Users.findOne({ where: { id: userId } });
  if (!getUser || userId !== reqId) {
    return { error: true, code: 'Unauthorized', message: 'Usuário não autorizado' };
  }
  BlogPosts.destroy({ where: { id } });
  return { error: false };
};

module.exports = {
  getByQuery,
  getAll,
  getById,
  create,
  update,
  exclude,
};
