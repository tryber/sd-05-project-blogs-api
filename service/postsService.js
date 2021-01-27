const { Posts } = require('../models');

const createPost = async (title, content, userId) => {
  const post = await Posts.create({ title, content, userId });
  console.log('post:', post);
  return post;
};

module.exports = {
  createPost,
};
