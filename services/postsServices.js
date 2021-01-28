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

const getAll = async () => Post.findAll({ include: { model: User, as: 'user' } });

const getById = async ({ id }) => {
  const getPostById = await Post.findOne({ where: { id }, include: { model: User, as: 'user' } });
  // const getPostById = await Post.findByPk(id);
  if (!getPostById) {
    throw new CodeError('Post não existe', 'invalid_entries');
  }
  return getPostById;
};

const removePost = async ({ id }, userId) => {
  const getPostById = await Post.findByPk(id);
  if (!getPostById) {
    throw new CodeError('Post não existe', 'invalid_entries');
  }

  if (getPostById.userId !== userId.id) {
    throw new CodeError('Usuário não autorizado', 'invalid_data');
  }
  return Post.destroy({ where: { id } });
};

module.exports = { create, getAll, getById, removePost };
