const { Posts } = require('../models');

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
    userId
  });
  console.log(userId)
  return createPost;
};

module.exports = {
  create,
};
