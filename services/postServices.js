const { Posts } = require('../models');

async function createPost(title, content, id) {
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

  const newPost = await Posts.create({
    title,
    content,
    userId: id,
  });

  return newPost;
}

module.exports = { createPost };
