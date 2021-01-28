const Router = require('express');
const { Posts, Users } = require('../models');
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

posts.get('/', authToken, async (req, res) => {
  Posts.findAll({ include: { model: Users, as: 'user' } })
    .then((postss) => res.status(200).json(postss))
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'deu ruim' });
    });
});

posts.get('/:id', authToken, async (req, res) => {
  Posts.findByPk(req.params.id, { include: { model: Users, as: 'user' } })
    .then((postss) => {
      if (postss == null) {
        return res.status(404).json({ message: 'Post não existe' });
      }
      return res.status(200).json(postss);
    })
    .catch((e) => {
      console.log(e.message);
      return res.status(500).json({ message: 'deu ruim' });
    });
});

posts.put('/:id', authToken, postM.verifyPost, async (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;
  const userId = req.tokenId;
  const post = await Posts.findByPk(postId);
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  Posts.update({ title, content }, { where: { id: postId } })
    .then(() => res.status(200).json({ title, content, userId }))
    .catch((e) => {
      console.log(e.message);
      return res.status(500).json({ message: 'deu ruim' });
    });
});

module.exports = posts;
