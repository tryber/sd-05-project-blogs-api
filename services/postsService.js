const { Post, User } = require('../models');

const create = async (title, content, id) => {
  if (!title) return { error: true, message: '"title" is required', code: 400 };
  if (!content) return { error: true, message: '"content" is required', code: 400 };
  const createP = await Post.create({ title, content, userId: id });
  return createP;
};

const getAll = async () => {
  const getPosts = await Post.findAll({
    include: { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
  });
  return getPosts;
};

module.exports = {
  create,
  getAll,
};
