const { Posts, Users } = require('../models');

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

async function getAllPosts() {
  const posts = await Posts.findAll({ include: { model: Users, as: 'user' } });

  return posts;
}

async function getPostById(id) {
  const postID = await Posts.findAll({
    where: { id },
    include: { model: Users, as: 'user' },
  });

  if (postID.length === 0) {
    return {
      error: true,
      code: 404,
      message: 'Post não existe',
    };
  }

  return postID[0].dataValues;
}

module.exports = { createPost, getAllPosts, getPostById };
