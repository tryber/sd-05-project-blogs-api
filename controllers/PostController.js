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

posts.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const getPostById = await services.getById(id);
  if (getPostById.error) return res.status(getPostById.code).json({ message: getPostById.message });
  return res.status(200).json(getPostById);
});

posts.put('/:id', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id: userId } = req.payload;
    const { id } = req.params;
    const updatePost = await services.update(title, content, id, userId);
    if (updatePost.error) {
      return res.status(updatePost.code).json({ message: updatePost.message });
    }
    return res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

posts.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id: userId } = req.payload;
    const { id } = req.params;
    const delPost = await services.deletePost(id, userId);
    if (delPost.error) {
      return res.status(delPost.code).json({ message: delPost.message });
    }
    res.status(204).json(delPost);
  } catch (error) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = posts;
