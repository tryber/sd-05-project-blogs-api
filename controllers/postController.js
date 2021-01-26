const { Router } = require('express');
const service = require('../services/postService');
const validateJWT = require('../auth/validateJWT');

const posts = Router();

posts.post('/', validateJWT, async (req, res) => {
  try {
    const { id } = req.payload;
    const { title, content } = req.body;
    const createPost = await service.create(title, content, id);
    if (createPost.error) {
      return res.status(createPost.code).json({ message: createPost.message });
    }
    const createdPost = {
      title: createPost.dataValues.title,
      content: createPost.dataValues.content,
      userId: createPost.dataValues.userId,
    };
    return res.status(201).json(createdPost);
  } catch (e) {
    res.send(e.message);
  }
});
posts.get('/', validateJWT, async (req, res) => {
  try {
    const getAllPosts = await service.getAll();
    return res.status(200).json(getAllPosts);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = posts;
