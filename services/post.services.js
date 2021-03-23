const Joi = require('@hapi/joi');
const { Post, User } = require('../models');

const CREATE_SCHEMA = Joi.object({
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

const createPost = async (userId, title, content) => {
  const { error } = CREATE_SCHEMA.validate({ title, content });

  if (error) throw INVALID_DATA(error.message);

  await Post.create({ userId, title, content });

  return {
    userId,
    title,
    content,
  };
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};
