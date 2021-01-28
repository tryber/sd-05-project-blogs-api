const { Post } = require('../models');
const throwErr = require('../utils/throwErr');

const createPost = async (title, content, userId) => {
  if (!title) return throwErr('bad-request', '"title" is required');

  if (!content) return throwErr('bad-request', '"content" is required');

  return Post.create({ title, content, userId });
};

module.exports = {
  createPost,
};
