const express = require('express');
const postsService = require('../services/postsService');
const validateToken = require('../utils/validateToken');

const postsRouter = express.Router();

postsRouter.post('/post', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.userData;

    const createPost = await postsService.createPost(title, content, id);

    if (createPost.error) {
      return res.status(createPost.statusCode).json({ message: createPost.message });
    }

    res.status(201).json({ title, content, userId: id });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = postsRouter;
