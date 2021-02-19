const { Posts } = require('../models');

module.exports = {
  createPost: async (title, content, userId) =>
    Posts.create({ title, content, userId }).then((postData) => postData),
};
