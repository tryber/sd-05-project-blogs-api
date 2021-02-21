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

postsController.get('/', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const allPosts = await postsServices.getAll(authorization);
    return res.status(200).json(allPosts);
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

postsController.get('/:id', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const post = await postsServices.getById(id, authorization);
    if (!post) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    return res.status(200).json(post);
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

postsController.put('/:id', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { title, content } = req.body;
    if (!content) return res.status(400).json({ message: '"content" is required' });
    if (!title) return res.status(400).json({ message: '"title" is required' });
    const post = await postsServices.updateById(id, title, content, authorization);
    if (post[0] === 0) return res.status(401).json({ message: 'Usuário não autorizado' });
    const postUpdated = await postsServices.findAfterUpdate(id, authorization);
    return res.status(200).json(postUpdated);
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
