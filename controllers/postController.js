const { Router } = require('express');
const hasToken = require('../middleware/hasToken');
const validatePost = require('../middleware/validatePost');
const postService = require('../services/postService');

const route = Router();

route.post('/', hasToken, validatePost, async (req, res) => {
  const { title, content } = req.body;
  const { user } = req;
  const newPost = await postService.createPost(title, content, user.id);

  return res.status(201).json(newPost);
});

module.exports = route;
