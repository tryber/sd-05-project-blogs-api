const { Router } = require('express');

const router = Router();
const service = require('../services/postService');
const { User, Post } = require('../models');
const autJWT = require('../middlewares/autTokenJWT');

router.post('/', autJWT, async (req, res) => {
  try {
    const { id: userId } = req.payload.useData.dataValues;
    const { title, content } = req.body;
    const postCreate = await service.create(title, content, userId);
    if (postCreate.error) {
      return res.status(postCreate.statusCode).json({ message: postCreate.message });
    }
    return res.status(201).json(postCreate);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.get('/', autJWT, async (_req, res) => {
  try {
    const findPosts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }],
    });
    return res.status(200).json(findPosts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.get('/search', autJWT, async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const findPost = await Post.findAll({ include: [{
      model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'],
    }] });
    const searchPost = findPost.filter(
      (post) => post.title.includes(q) || post.content.includes(q),
    );
    return res.status(200).json(searchPost);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.get('/:id', autJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const findPosts = await Post.findOne({ where: { id }, include: [{ model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] }] });
    if (findPosts === null) {
      return res.status(404).send({ message: 'Post não existe' });
    }
    return res.status(200).json(findPosts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.put('/:id', autJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.payload.useData.dataValues;
    const { title, content } = req.body;
    const updatePosts = await service.update(title, content, id, userId);
    if (updatePosts.error) {
      return res.status(updatePosts.statusCode).json({ message: updatePosts.message });
    }
    return res.status(200).json(updatePosts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

router.delete('/:id', autJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.payload.useData.dataValues;
    console.log(id);
    console.log(userId);
    const deletePosts = await service.destroy(id, userId);
    if (deletePosts.error) {
      return res.status(deletePosts.statusCode).json({ message: deletePosts.message });
    }
    return res.status(204).send({ message: 'Usuario excluído com sucesso.' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
