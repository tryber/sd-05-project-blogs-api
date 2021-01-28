const { Router } = require('express');

const { Posts, Users } = require('../models');

const service = require('../service/postService');

const checkToken = require('../Middlewares/checkToken');

// const { createToken } = require('../Middlewares/webTokenCreate');

const posts = Router();

posts.post('/', checkToken, async (req, res) => {
  try {
    const { id: userId } = req.payload;
    // console.log('\n\n', userId);
    const { title, content } = req.body;
    if (title === undefined) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (content === undefined) {
      return res.status(400).json({ message: '"content" is required' });
    }
    const createPost = await Posts.create({
      attributes: { exclude: ['id'] },
      title,
      content,
      userId,
    });
    // delete createPost.id;
    res.status(201).json(createPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // res.status(500).json({ message: 'Deu ruim' });
  }
});

posts.get('/', checkToken, async (_req, res) => {
  try {
    const findPosts = await Posts.findAll({
      include: [{ model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }],
    });
    // console.log('findUsers==>', findUsers);
    res.status(200).json(findPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // res.status(500).json({ message: 'Deu ruim' });
  }
});

posts.get('/search', checkToken, async (req, res) => {
  try {
    const { q } = req.query;
    /* const readPosts = await Posts.findAll({
      include: [{ model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }]
    }); */
    const findPosts = await Posts.findAll({
      include: [{ model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }],
    });
    // console.log('findPosts===>', findPosts.map((e) => e.dataValues) );
    const searchPost = findPosts.filter(
      (post) => post.title.includes(q) || post.content.includes(q),
    );
    return res.status(200).json(searchPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // res.status(500).json({ message: 'Deu ruim' });
  }
});

posts.get('/:id', checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const findPostId = await Posts.findOne({
      where: { id },
      include: [{ model: Users, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }],
    });
    if (!findPostId) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    res.status(200).json(findPostId);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'Deu ruim' });
  }
});

posts.put('/:id', checkToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id: userId } = req.payload;
    // console.log('userId====> ',userId);
    const { id } = req.params;
    // const updatePost = await Posts.update({ title, content }, { where: { id, userId } });

    // const updatePost = await service.update({ title, content }, { where: { id, userId } });
    const updatePost = await service.update(title, content, id, userId);
    if (updatePost.error) {
      return res.status(updatePost.statusCode).json({ message: updatePost.message });
    }
    // const findPost = await Posts.findOne({ where: { id } });
    // console.log('findPost===>',findPost)
    return res.status(200).json(updatePost);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    res.status(500).json({ message: 'Deu ruim' });
  }
});

posts.delete('/:id', checkToken, async (req, res) => {
  try {
    const { id: userId } = req.payload;
    const { id } = req.params;
    const validatePost = await Posts.findOne({ where: { id } });
    if (!validatePost) return res.status(404).json({ message: 'Post não existe' });
    if (validatePost.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });
    const deletePost = await Posts.destroy({ where: { id } });
    res.status(204).json(deletePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    // res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = posts;
