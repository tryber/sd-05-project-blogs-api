const postService = require('./postService');
const { Post } = require('../../models');

const postFactory = () => ({
  createPost: postService.createPost(Post),
});

module.exports = postFactory;
