const { Post, User } = require('../models');
const { decodePayload, checkToken } = require('../auth/jwt.auth');

const create = async (title, content, authorization) => {
  checkToken(authorization);
  const { payload } = decodePayload(authorization);
  const post = await Post.create({
    title,
    content,
    userId: payload.id,
    updated: Date.now(),
    published: Date.now(),
  });
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

const getById = async (id, authorization) => {
  checkToken(authorization);
  const post = await Post.findOne({
    where: { id },
    include: { model: User, as: 'user' },
  });
  return post;
};

const updateById = async (id, title, content, authorization) => {
  checkToken(authorization);
  const { payload } = decodePayload(authorization);
  const userId = payload.id;
  const update = await Post.update(
    {
      title,
      content,
    },
    { where: { id: parseInt(id, 10), userId } },
  );
  return update;
};

const findAfterUpdate = async (id, authorization) => {
  checkToken(authorization);
  const post = await Post.findOne({
    where: { id },
    attributes: ['title', 'content', 'userId'],
  });
  return post;
};

const deletePost = async (id, authorization) => {
  checkToken(authorization);
  const userId = decodePayload(authorization).payload.id;
  await Post.destroy({ where: { id, userId } });
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  findAfterUpdate,
  deletePost,
};
