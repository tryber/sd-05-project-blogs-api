// const { Op } = require('sequelize');
const { Post } = require('../models');

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

  console.log(`id no service: ${id}`);

  return Post.create({ content, title, userId: id });
};

module.exports = { create };
