const { Op } = require('sequelize');
const { Posts, Users } = require('../models');

const createPost = async (title, content, userId) =>
  Posts.create({ title, content, userId }).then((postData) => postData);

const getPosts = async () =>
  Posts.findAll({
    include: [{ model: Users, as: 'user' }],
    attributes: { exclude: ['password'] },
  });

const getPostById = async (id) =>
  Posts.findOne({
    where: { id },
    include: [{ model: Users, as: 'user' }],
    attributes: { exclude: ['password'] },
  });

const updatePost = async (id, title, content, userId) =>
  Posts.update({ title, content, userId }, { where: { id } });

const searchPost = async (query) =>
  Posts.findAll({
    where: {
      [Op.or]: [
        {
          title: { [Op.like]: `%${query}%` },
        },
        {
          content: { [Op.like]: `%${query}%` },
        },
      ],
    },
    include: [{ model: Users, as: 'user' }],
    attributes: { exclude: ['password'] },
  });

const deletePost = async (id) =>
  Posts.destroy({
    where: { id },
  });

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  searchPost,
  deletePost,
};
