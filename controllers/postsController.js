const express = require('express');

const router = express.Router();

const { Posts } = require('../models');
const { verifyJWT } = require('../middleware/authorization');
const { validateTitle, validateContent } = require('../middleware/postValidation');

router.post('/',
  verifyJWT,
  validateTitle,
  validateContent,
  async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.payload;
    const post = await Posts.create({ title, content, userId: id });
    if (post.message) return res.status(400).json({ message: 'Algo deu errado' });
    return res.status(201).json(post);
  });
