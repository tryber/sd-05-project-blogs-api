const express = require('express');
const { Post, User } = require('../models');
const auth = require('../middlewares/token');
const postService = require('../services/post');

const routePost = express.Router();

routePost.post('/', auth, postService, async (req, res) => {
  try {
    console.log(req.user);
    const { title, content } = req.body;
    const { id } = req.user;
    const newPost = await Post.create({ title, content, userId: id });
    console.log(newPost);
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

module.exports = routePost;