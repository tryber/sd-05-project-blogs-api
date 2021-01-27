const { Posts, Users } = require('../models');

const createPost = async (title, content, userId) => {
  const post = await Posts.create({ title, content, userId });
  return post;
};

const getAllPosts = () =>
  Posts.findAll({
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });

module.exports = {
  createPost,
  getAllPosts,
};
