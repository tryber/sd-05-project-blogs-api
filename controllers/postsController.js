const express = require('express');
const encrypt = require('jsonwebtoken');
const { secret } = require('../middlewares/generateToken');
// require('dotenv/config');
// const { Op } = require('sequelize');
const { Post, User } = require('../models');
const jwt = require('../middlewares/generateToken');

const postRouter = express.Router();

// Requisito 6 - endpoint POST /post
postRouter.post('/post', jwt.authorizationToken, async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, secret);
  const newPost = { title, content, userId: decoded.data.id };
  //  check title
  if (!title) return res.status(400).json({ message: '"title" is required' });
  //  check content
  if (!content) return res.status(400).json({ message: '"content" is required' });
  await Post.create(newPost);
  res.status(201).json(newPost);
});

// Requisito 7 - endpoint GET /post
postRouter.get('/post', jwt.authorizationToken, async (req, res) => {
  const posts = await Post.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });
  res.status(200).json(posts);
});

// Requisito 8 - endpoint GET post/:id
postRouter.get('/post/:id', jwt.authorizationToken, async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  res.status(200).json(post);
});

// Requisito 9 - endpoint PUT /post/:id
postRouter.put('/post/:id', jwt.authorizationToken, async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, secret);
  const editedPost = { title, content, userId: decoded.data.id };
  //  check title
  if (!title) return res.status(400).json({ message: '"title" is required' });
  //  check content
  if (!content) return res.status(400).json({ message: '"content" is required' });
  const { userId } = await Post.findOne({
    where: { id: req.params.id },
  });
  //  check user
  if (decoded.data.id !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  await Post.update(editedPost, { where: { id: req.params.id } });
  res.status(200).json(editedPost);
});

// Requisito 10 - endpoint GET post/search?q=:searchTerm
// postRouter.get('/post/search', jwt.authorizationToken, async (req, res) => {
//   const { q } = req.query;
//   const postBySearch = await Post.findAll({
//     where: {
//       [Op.or]: [
//         { title: { [Op.substring]: `q` } },
//         { content: { [Op.substring]: `q } },
//       ],
//     },
//     include: { model: User, as: 'user' [password]},
//   });
//   return res.status(200).json(postBySearch);
// });

// Requisito 11 -  endpoint DELETE post/:id
postRouter.delete('/post/:id', jwt.authorizationToken, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, secret);
  const post = await Post.findOne({
    where: { id: req.params.id },
  });
  // check post
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  const { userId } = post;
  //  check user
  if (decoded.data.id !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  await Post.destroy({ where: { id: req.params.id } });
  res.status(204).end();
});

module.exports = postRouter;
