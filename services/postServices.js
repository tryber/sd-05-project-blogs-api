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
    include: { model: Users, as: 'user' },
  });

  if (postId.length === 0) {
    return {
      error: true,
      code: 404,
      message: 'Post não existe',
    };
  }

  return postID[0].dataValues;
}

module.exports = { create, getAll, getById };
