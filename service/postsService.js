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

const getOnePost = (id) =>
  Posts.findOne({
    where: { id },
    include: {
      model: Users,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
  });

const savePostNewInfo = async (title, content, id) => {
  await Posts.update({ title, content }, { where: { id } });
  const newPost = await Posts.findOne(
    { where: { id } },
    { attributes: ['title', 'content', 'userId'] },
  );

  return newPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  savePostNewInfo,
};
