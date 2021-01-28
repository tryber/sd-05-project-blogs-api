const { Router } = require('express');
const service = require('../services/postService');
const validateJWT = require('../auth/validateJWT');

const posts = Router();

posts.get('/:id', validateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const getPostById = await service.getById(id);
    if (getPostById.error) {
      return res.status(getPostById.code).json({ message: getPostById.message });
    }
    return res.status(200).json(getPostById);
  } catch (e) {
    res.send(e.message);
  }
});
posts.put('/:id', validateJWT, async (req, res) => {
  try {
    const userId = req.payload.id;
    const { title, content } = req.body;
    const postId = req.params.id;
    const updatePost = await service.updPost(userId, postId, title, content);
    if (updatePost.error) {
      return res.status(updatePost.code).json({ message: updatePost.message });
    }
    if (updatePost[0] === 0) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    return res.status(200).json(updatePost);
  } catch (e) {
    res.send(e.message);
  }
});

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
