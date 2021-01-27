const express = require('express');
const hasToken = require('../middleware/hasToken');
const validatePostInformation = require('../middleware/validatePostInformation');
const postsService = require('../service/postsService');

const route = express.Router();

route.post('/', hasToken, validatePostInformation, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const post = await postsService.createPost(title, content, id);

  return res.status(201).json(post);
});

route.get('/', hasToken, async (req, res) => {
  const posts = await postsService.getAllPosts();
  console.log(posts);
  return res.status(200).json(posts);
});

route.get('/:id', hasToken, async (req, res) => {
  const { id } = req.params;
  const post = await postsService.getOnePost(id);
  if (!post) {
    return res.status(404).json({
      message: 'Post não existe',
    });
  }

  return res.status(200).json(post);
});

module.exports = route;
