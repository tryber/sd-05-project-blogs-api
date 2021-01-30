const { Router } = require('express');
const validateJWT = require('../token/validateToken');
const service = require('../services/postServices');

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
  } catch (err) {
    return res.send(err.message);
  }
});

posts.get('/', validateJWT, async (req, res) => {
  try {
    const getAllPosts = await service.getAll();
    return res.status(200).json(getAllPosts);
  } catch (err) {
    return res.send(err.message);
  }
});

posts.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const getPostById = await service.getById(id);
    if (getPostById.error) {
      return res.status(getPostById.code).json({ message: getPostById.message });
    }
    return res.status(200).json(getPostById);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = posts;
