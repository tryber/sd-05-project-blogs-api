const express = require('express');
const hasToken = require('../middleware/hasToken');
const validatePostInformation = require('../middleware/validatePostInformation');
const postsService = require('../service/postsService');

const route = express.Router();

route.post('/', hasToken, validatePostInformation, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const post = await postsService.createPost(title, content, id);

  return res.status(201).json(post);
});

module.exports = route;
