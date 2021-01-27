const postService = require('./postService');
const { Post, User } = require('../../models');

const postFactory = () => ({
  createPost: postService.createPost(Post),
  getAllPosts: postService.getAllPosts(Post, User),
  getPostById: postService.getPostById(Post, User),
  updatePost: postService.updatePost(Post),
  searchPost: postService.searchPost(Post, User),
  deletePost: postService.deletePost(Post),
});

module.exports = postFactory;

// Importar as funções desestruturadas no require deixaria a factory mais limpa.
