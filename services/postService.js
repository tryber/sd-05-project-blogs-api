const { Posts, Users } = require('../models');

const create = async (title, content, id) => {
  if (!title) {
    return {
      error: true,
      code: 400,
      message: '"title" is required',
    };
  }
  if (!content) {
    return {
      error: true,
      code: 400,
      message: '"content" is required',
    };
  }
  const cPost = await Posts.create({
    title,
    content,
    userId: id,
  });
  return cPost;
};
const getAll = async () => {
  const allPosts = await Posts.findAll({ include: { model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] } });
  return allPosts;
};
const getById = async (id) => {
  const postById = await Posts.findAll({
    where: { id },
    include: { model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] } });
  if (postById.length === 0) {
    return {
      error: true,
      code: 404,
      message: 'Post não existe',
    };
  }
  return postById[0].dataValues;
};
module.exports = {
  create,
  getAll,
  getById,
};
