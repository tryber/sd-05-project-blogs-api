const Joi = require('@hapi/joi');
const { Post, User } = require('../models');

const POST_SCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const INVALID_DATA = (message) => ({
  name: 'InvalidDataError',
  message,
  status: 400,
});

const POST_NOT_FOUND = {
  name: 'PostNotFoundError',
  message: 'Post não existe',
  status: 404,
};

const UNAUTHORIZED_USER = {
  name: 'InvalidUserError',
  message: 'Usuário não autorizado',
  status: 401,
};

const createPost = async (userId, title, content) => {
  const { error } = POST_SCHEMA.validate({ title, content });

  if (error) throw INVALID_DATA(error.message);

  const newPost = await Post.create({ userId, title, content });

  return newPost;
};

const getAllPosts = async () => {
  const postsFound = await Post.findAll({
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    },
  });

  return postsFound;
};

const getPostById = async (id) => {
  const postFound = await Post.findOne({
    where: { id },
    include: {
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    },
  });

  if (!postFound) throw POST_NOT_FOUND;

  return postFound;
};

const editPost = async (id, userId, title, content) => {
  const { error } = POST_SCHEMA.validate({ title, content });

  if (error) throw INVALID_DATA(error.message);

  const edit = await Post.update(
    { title, content },
    { where: { id, userId } },
  );

  if (edit[0] === 0) throw UNAUTHORIZED_USER;

  const editedPost = await Post.findOne({
    where: { id, userId },
    attributes: ['title', 'content', 'userId'],
  });

  return editedPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
};
