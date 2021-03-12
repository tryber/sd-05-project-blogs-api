const express = require('express');

const rescue = require('express-rescue');

const { Post } = require('../models');
const validateToken = require('../middleware/validaToken');

const {
  CREATE_POST_SCHEMA,
  validate,
} = require('../utils/validation');

const postRouter = express.Router();

postRouter.post('/', validateToken, rescue(async (req, res) => {
  const { title, content } = req.body;
  validate(CREATE_POST_SCHEMA)(req.body);
  try {
    const { id } = req.payload;
    await Post.create({ title, content, userId: id });
    return res.status(201).json({ title, content, userId: id });
  } catch (error) {
    throw new Error('Algo deu errado|500');
  }
}));

module.exports = postRouter;
