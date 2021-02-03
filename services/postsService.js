const { Post, User } = require('../models');

const create = async (title, content, id) => {
  if (!title) return { error: true, message: '"title" is required', code: 400 };
  if (!content) return { error: true, message: '"content" is required', code: 400 };
  const createP = await Post.create({ title, content, userId: id });
  return createP;
};

const getAll = async () => {
  const getPosts = await Post.findAll({
    include: { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
  });
  return getPosts;
};

const getById = async (id) => {
  const getPostById = await Post.findAll({
    where: { id },
    include: { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] } });
  if (!getPostById) {
    return { error: true, message: 'Post não existe', code: 404 };
  }
  return getPostById;
};

const update = async (title, content, id, userId) => {
  const checkPost = await Post.findOne({ where: { id } });
  if (!title) return { error: true, message: '"title" is required', code: 400 };
  if (!content) return { error: true, message: '"content" is required', code: 400 };
  if (checkPost.userId !== userId) {
    return { error: true, message: 'Usuário não autorizado', code: 401 };
  }
  await Post.update({ title, content }, { where: { id, userId } });
  return { title, content, userId };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
