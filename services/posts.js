const { Post, User } = require('../models');
const { decodePayload, checkToken } = require('../auth/jwt.auth');

const create = async (title, content, authorization) => {
  checkToken(authorization);
  const { payload } = decodePayload(authorization);
  console.log(payload.id);
  const post = await Post.create({ title, content, userId: payload.id, updated: Date.now(), published: Date.now() });
  if (!post) {
    throw new Error('Campos inválidos');
  }

  return post;
};

const getAll = async (authorization) => {
  checkToken(authorization);
  const allPosts = await Post.findAll({ include: { model: User, as: 'user' } });
  return allPosts;
};

module.exports = {
  create,
  getAll,
};
