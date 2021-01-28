const { Post, User } = require('../models');
const throwErr = require('../utils/throwErr');

const createPost = async (title, content, userId) => {
  if (!title) return throwErr('bad-request', '"title" is required');

  if (!content) return throwErr('bad-request', '"content" is required');

  return Post.create({ title, content, userId });
};

const getAllPosts = async () => Post.findAll({ include: { model: User, as: 'user', attributes: { exclude: ['password'] } } });

const getOnePost = async (id) => {
  const post = await Post.findOne({ where: { id }, include: { model: User, as: 'user', attributes: { exclude: ['password'] } } });

  if (!post) return throwErr('not-found', 'Post não existe', 404);

  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
};
