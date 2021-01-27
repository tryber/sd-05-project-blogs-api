const { Router } = require('express');

const { Posts, Users } = require('../models');

// const service = require('../service/postService');

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

module.exports = posts;
