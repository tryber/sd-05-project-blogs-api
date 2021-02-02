const { Posts, Users } = require('../models');

const createPost = async (title, content, userId) => {
  const newPost = await Posts.create({ title, content, userId });
  return newPost;
};

const getPosts = () =>
  Posts.findAll({
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });

const getPostById = (id) =>
  Posts.findOne({
    where: { id },
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });

const updatePost = async (title, content, id) => {
  await Posts.update({ title, content }, { where: { id } });
  const newPost = await Posts.findOne(
    { where: { id } },
    { attributes: ['title', 'content', 'userId'] },
  );

  return newPost;
};
module.exports = {
  getPosts,
  createPost,
  updatePost,
  getPostById,
};
