const rescue = require('express-rescue');
const { Post, User } = require('../models');

const {
  validate,
  validateAuth,
  POST_SCHEMA,
} = require('../utils/validation.util');

const registerPost = rescue(async (req, _res, next) => {
  const userId = validateAuth(req)();
  validate(POST_SCHEMA)(req.body);
  const published = new Date();
  const updated = new Date();
  await Post.create({ ...req.body, published, updated, userId });
  req.data = { ...req.body, userId };
  next();
});

const getPost = rescue(async (req, _res, next) => {
  validateAuth(req)();
  const { id } = req.params;
  const exclude = ['password', 'createdAt', 'updatedAt'];
  const post = await Post.findByPk(id, {
    include: { model: User, as: 'user', attributes: { exclude } },
  });
  if (!post) throw new Error('Post não existe;404');
  req.data = post;
  next();
});

const getAllPosts = rescue(async (req, _res, next) => {
  validateAuth(req)();
  const exclude = ['password', 'createdAt', 'updatedAt'];
  const postList = await Post.findAll({
    include: { model: User, as: 'user', attributes: { exclude } },
  });
  req.data = postList;
  next();
});

module.exports = {
  registerPost,
  getAllPosts,
  getPost,
};
