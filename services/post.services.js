const Joi = require('@hapi/joi');
const { Post } = require('../models');

const CREATE_SCHEMA = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const INVALID_DATA = (message) => ({
  name: 'InvalidDataError',
  message,
  status: 400,
});

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

module.exports = {
  createPost,
};
