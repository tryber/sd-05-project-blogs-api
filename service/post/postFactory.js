const postService = require('./postService');
const { Post, User } = require('../../models');

const postFactory = () => ({
  createPost: postService.createPost(Post),
  getAllPosts: postService.getAllPosts(Post, User),
  getPostById: postService.getPostById(Post, User),
  updatePost: postService.updatePost(Post),
});

module.exports = postFactory;
