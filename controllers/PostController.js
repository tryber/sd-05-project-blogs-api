const { Router } = require('express');
const services = require('../services/postsService');
const validateToken = require('../auth/validateToken');

const posts = Router();

posts.post('/', validateToken, async (req, res) => {
  try {
    const { id } = req.payload;
    const { title, content } = req.body;
    const createPost = await services.create(title, content, id);
    if (createPost.error) {
      return res.status(createPost.code).json({ message: createPost.message });
    }
    const created = {
      title: createPost.dataValues.title,
      content: createPost.dataValues.content,
      userId: createPost.dataValues.userId,
    };
    return res.status(201).json(created);
  } catch (error) {
    res.send(error.message);
  }
});

posts.get('/', validateToken, async (_req, res) => {
  try {
    const getPosts = await services.getAll();
    return res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = posts;
