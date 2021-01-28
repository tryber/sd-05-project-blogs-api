// const { Op } = require('sequelize');
const { Post } = require('../models');
const { User } = require('../models');

class CodeError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const create = async ({ content, title }, { id }) => {
  if (!content) {
    throw new CodeError('"content" is required', 'invalid_entries');
  }

  if (!title) {
    throw new CodeError('"title" is required', 'invalid_entries');
  }

  return Post.create({ content, title, userId: id });
};

// const getAll = async () => {
//   const allPosts = await Post.findAll({ include: {model: User, as: 'user'}});
//   return allPosts;
// };

const getAll = async () => Post.findAll({ include: { model: User, as: 'user' } });

module.exports = { create, getAll };
