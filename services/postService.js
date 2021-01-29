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

module.exports = {
  create,
};
