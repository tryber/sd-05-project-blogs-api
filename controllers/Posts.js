const express = require('express');
const { Posts } = require('../models');
const authToken = require('../middlewares/authToken');
const postPost = require('../middlewares/postPost');
// const services = require('../services');

const router = express.Router();

router.post('/', authToken, postPost, async (req, res) => {
  try {
    console.log(req.user);
    const { title, content } = req.body;
    const { id } = req.user;
    console.log('oi');
    const newPost = await Posts.create({ title, content, userId: id });
    console.log(newPost);
    res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

module.exports = router;
