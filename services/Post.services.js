const { Posts, Users } = require('../models');

module.exports = {
  createPost: async (title, content, userId) =>
    Posts.create({ title, content, userId }).then((postData) => postData),
  getPosts: async () => Posts.findAll({
    include: [{ model: Users, as: 'user' }],
    attributes: { exclude: ['password'] } }),
};
