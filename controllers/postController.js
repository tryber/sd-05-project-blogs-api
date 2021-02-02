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

route.get('/', hasToken, async (_req, res) => {
  const posts = await postService.getPosts();
  return res.status(200).json(posts);
});

route.get('/:id', hasToken, async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  return res.status(200).json(post);
});

module.exports = route;
