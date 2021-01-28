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

async function updatePost(id, title, content, userId) {
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

  const update = await Posts.update({ title, content }, { where: { id, userId } });

  return update[0] === 1 ? Posts.findOne({ where: { id } }) : update;
}

async function deletePost(id, userId) {
  const post = await Posts.findOne({ where: { id } });

  if (!post) {
    return { error: true, code: 404, message: 'Post não existe' };
  }

  const author = post.dataValues.userId;

  if (userId === author) {
    return Posts.destroy({ where: { id, userId } });
  }

  return { error: true, code: 401, message: 'Usuário não autorizado' };
}

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
