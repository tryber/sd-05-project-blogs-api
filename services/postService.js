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

module.exports = {
  getPosts,
  createPost,
  getPostById,
};
