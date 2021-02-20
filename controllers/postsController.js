const express = require('express');
const postsServices = require('../services/posts');

const postsController = express.Router();

postsController.post('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { title, content } = req.body;
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
    const createPost = await postsServices.create(title, content, authorization);
    return res.status(201).json(createPost);
  } catch (error) {
    if (error.message) {
      if (error.message === 'jwt malformed') {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
      }
      if (error.message === 'jwt must be provided') {
        return res.status(401).json({ message: 'Token não encontrado' });
      }
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: 'algo deu ruim' });
  }
});

module.exports = postsController;
