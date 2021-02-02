const { Posts } = require('../models');

const createPost = async (title, content, userId) => {
  const newPost = await Posts.create({ title, content, userId });
  return newPost;
};

module.exports = {
  createPost,
};
