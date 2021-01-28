const { Sequelize } = require('sequelize');
const { Post, User } = require('../models');
const { StatusError } = require('../Utils');

const createPost = async ({ title = null, content = null }, userId) => {
  if (!title) throw new StatusError('"title" is required', 400);
  if (!content) throw new StatusError('"content" is required', 400);

  console.log('====================================');
  console.log(userId);
  console.log('====================================');

  return Post.create({ title, content, userId });
};

const editPost = async (titleAndContent, id, userId) => {
  const post = await Post.findOne({ where: { id } });

  if (userId !== post.userId) throw new StatusError('Usuário não autorizado', 401);

  const { title = null, content = null } = titleAndContent;

  if (!title) throw new StatusError('"title" is required', 400);
  if (!content) throw new StatusError('"content" is required', 400);

  await Post.update({ title, content }, { where: { id } });

  return { title, content, userId };
};
const deletePost = async (id, userId) => {
  const post = await Post.findOne({ where: { id } });
  console.log('será que tem o post?');
  console.log(post);

  if (!post) throw new StatusError('Post não existe', 404);

  if (userId !== post.userId) throw new StatusError('Usuário não autorizado', 401);

  return Post.destroy({ where: { id } });
};

const getAll = async () => {
  const allPosts = await Post.findAll({ include: { model: User, as: 'user' } });

  return allPosts;
};

const getPostById = async (id) => {
  const post = await Post.findOne({
    where: { id },
    include: { model: User, as: 'user' },
  });

  if (!post) throw new StatusError('Post não existe', 404);

  return post;
};

// https://sequelize.org/v5/manual/querying.html
const searchPostThatHasTerm = async (term) => {
  const postsThatMatch = await Post.findAll({
    where: {
      [Sequelize.Op.or]: [
        { title: { [Sequelize.Op.like]: `%${term}%` } },
        { content: { [Sequelize.Op.like]: `%${term}%` } },
      ],
    },
    include: { model: User, as: 'user' },
  });
  return postsThatMatch;
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getAll,
  getPostById,
  searchPostThatHasTerm,
};
