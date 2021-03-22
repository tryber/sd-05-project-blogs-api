const { Posts, User } = require('../models');

const create = async (title, content, id) => {
  if (!title) {
    return {
      error: true, code: 400, message: '"title" is required',
    };
  }
  if (!content) {
    return {
      error: true, code: 400, message: '"content" is required',
    };
  }
  const newPost = await Posts.create({
    title, content, userId: id,
  });
  return newPost;
};

const getAll = async () => {
  const posts = await Posts.findAll({ include: { model: User, as: 'user' } });
  return posts;
};

const getById = async (id) => {
  const postId = await Posts.findAll({
    where: { id },
    include: { model: User, as: 'user' },
  });

  if (postId.length === 0) {
    return {
      error: true,
      code: 404,
      message: 'Post não existe',
    };
  }

  return postId[0].dataValues;
};

const update = async (id, title, content, userId) => {
  if (!title) {
    return {
      error: true, code: 400, message: '"title" is required',
    };
  }
  if (!content) {
    return {
      error: true, code: 400, message: '"content" is required',
    };
  }

  const updatePost = await Posts.update({ title, content }, { where: { id, userId } });

  return updatePost[0] === 1 ? Posts.findOne({ where: { id, userId } }) : updatePost;
};

const destroy = async (id, userId) => {
  const post = await Posts.findOne({ where: { id } });

  if (!post) {
    return { error: true, code: 404, message: 'Post não existe' };
  }
  const author = post.dataValues.userId;
  if (userId === author) {
    return Posts.destroy({ where: { id, userId } });
  }
  return { error: true, code: 401, message: 'Usuário não autorizado' };
};

module.exports = { create, getAll, getById, update, destroy };
