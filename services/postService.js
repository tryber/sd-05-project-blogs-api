const { Post } = require('../models');

const create = async (title, content, userId) => {
  if (!title) {
    return { error: true, message: '"title" is required', statusCode: 400 };
  }
  if (!content) {
    return { error: true, message: '"content" is required', statusCode: 400 };
  }
  return Post.create({ title, content, userId });
};

const update = async (title, content, id, userId) => {
  const findPost = await Post.findOne({ where: { id } });
  if (userId !== findPost.userId) {
    return { error: true, message: 'Usuário não autorizado', statusCode: 401 };
  }
  if (!title) {
    return { error: true, message: '"title" is required', statusCode: 400 };
  }
  if (!content) {
    return { error: true, message: '"content" is required', statusCode: 400 };
  }
  await Post.update({ title, content }, { where: { id } });
  return { title, content, userId };
};

const destroy = async (id, userId) => {
  const findPost = await Post.findOne({ where: { id } });
  if (!findPost) {
    return { error: true, message: 'Post não existe', statusCode: 404 };
  }
  if (userId !== findPost.userId) {
    return { error: true, message: 'Usuário não autorizado', statusCode: 401 };
  }
  return Post.destroy({ where: { id } });
};

module.exports = {
  create,
  update,
  destroy,
};
