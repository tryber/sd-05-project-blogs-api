const Router = require('express');
const { Posts } = require('../models');
const { postM, authToken } = require('../middlewares');

const posts = Router();

posts.post('/', authToken, postM.verifyPost, (req, res) => {
  const { title, content } = req.body;
  const userId = req.tokenId;
  console.log(req.tokenId);
  Posts.create({
    title,
    content,
    userId,
    published: Date.now(),
    updated: Date.now(),
  })
    .then(() => res.status(201).json({ title, content, userId: req.tokenId }))
    .catch((e) => {
      console.log(e);
      res.status(500).json({ message: 'deu ruim' });
    });
});

module.exports = posts;
