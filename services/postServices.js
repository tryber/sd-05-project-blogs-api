const { Posts, Users } = require('../models');

const create = async (title, content, userId) => {
  if (!title) {
    return {
      error: true,
      code: 400,
      message: '"title" is required',
    };
  }
  if (!content) {
    return {
      error: true,
      code: 400,
      message: '"content" is required',
    };
  }
  const createPost = await Posts.create({
    title,
    content,
    userId,
  });
  console.log(userId);
  return createPost;
};

const getAll = async () => {
  const allPosts = await Posts.findAll({
    include: { model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
  });
  return allPosts;
};

const getById = async (id) => {
  const postById = await Posts.findAll({
    where: { id },
    include: { model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
  });
  if (postById.length === 0) {
    return {
      error: true,
      code: 404,
      message: 'Post não existe',
    };
  }
  return postById[0].dataValues;
};

const editPost = async (userId, id, title, content) => {
  if (!title) {
    return {
      error: true,
      code: 400,
      message: '"title" is required',
    };
  }
  if (!content) {
    return {
      error: true,
      code: 400,
      message: '"content" is required',
    };
  }
  const editedPost = await Posts.update({ title, content }, { where: { id, userId } });
  if (editedPost[0] === 1) {
    return Posts.findOne({ where: { id }, attributes: ['title', 'content', 'userId'] });
  }
  return editedPost;
};

module.exports = {
  create,
  getAll,
  getById,
  editPost,
};
