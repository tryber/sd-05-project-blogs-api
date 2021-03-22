const express = require('express');
const { Post, User } = require('../models');
const auth = require('../middlewares/token');
const createPost = require('../middlewares/createPost');
const getPost = require('../middlewares/getPost');
const deletar = require('../middlewares/deletar');

const routePost = express.Router();

routePost.post('/', auth, createPost, async (req, res) => {
  try {
    const { title, content } = req.body;
    // console.log('aquiiii', req.user);
    const { id } = req.user;
    const newPost = await Post.create({ title, content, userId: id });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routePost.get('/', auth, async (req, res) => {
  try {
    const getAll = await Post.findAll({ include: { model: User, as: 'user' } });
    res.status(200).json(getAll);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routePost.get('/:id', auth, getPost, async (req, res) => {
  try {
    const { postData } = req;
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routePost.delete('/:id', auth, deletar, async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = routePost;
