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

postsRouter.get('/post', validateToken, async (req, res) => {
  try {
    const getAllPosts = await postsService.getAllPosts();

    if (getAllPosts.error) {
      return res.status(getAllPosts.statusCode).json({ message: getAllPosts.message });
    }

    res.status(200).json(getAllPosts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

postsRouter.get('/post/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const getOnePost = await postsService.getOnePost(id);

    if (getOnePost.error) {
      return res.status(getOnePost.statusCode).json({ message: getOnePost.message });
    }

    return res.status(200).json(getOnePost);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

postsRouter.put('/post/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userData.id;
    const { title, content } = req.body;

    const editPost = await postsService.editPost(Number(id), userId, title, content);

    if (editPost.error) {
      return res.status(editPost.statusCode).json({ message: editPost.message });
    }

    return res.status(200).json({ title, content, userId });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = postsRouter;
