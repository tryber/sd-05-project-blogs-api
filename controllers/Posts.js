const express = require('express');
const { Posts, Users } = require('../models');
const authToken = require('../middlewares/authToken');
const postPost = require('../middlewares/postPost');
const postById = require('../middlewares/postById');
const deletePost = require('../middlewares/deletePost');
// const services = require('../services');

const router = express.Router();

router.post('/', authToken, postPost, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;

    const newPost = await Posts.create({ title, content, userId: id });

    res.status(201).json(newPost);
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.get('/:id', authToken, postById, async (req, res) => {
  try {
    const { postData } = req;

    res.status(200).json(postData);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.get('/', authToken, async (req, res) => {
  try {
    const allPosts = await Posts.findAll({ include: { model: Users, as: 'user' } });

    res.status(200).json(allPosts);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

router.delete('/:id', authToken, deletePost, async (req, res) => {
  try {
    const { id } = req.params;

    await Posts.destroy({ where: { id } });

    res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
