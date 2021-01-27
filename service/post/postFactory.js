const postService = require('./postService');
const { Post, User } = require('../../models');

const postFactory = () => ({
  createPost: postService.createPost(Post),
  getAllPosts: postService.getAllPosts(Post, User),
});

module.exports = postFactory;
