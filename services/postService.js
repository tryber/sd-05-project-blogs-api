const { Posts } = require('../models');

const create = async (title, content, id) => {
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
  const cPost = await Posts.create({
    title,
    content,
    userId: id,
  });
  return cPost;
};

module.exports = {
  create,
};
