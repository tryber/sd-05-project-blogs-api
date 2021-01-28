const express = require('express');
const { Posts, Users } = require('../models');
const {
  postValidation,
  postAuth,
} = require('../services/PostsServices');
const { authValidation } = require('../services/UsersServices');

const router = express.Router();

router.post('/post', postValidation, authValidation, (req, res) => {
  const { title, content } = req.body;
  const { userInformation } = req;
  Posts.create({ title, content, userId: userInformation.user.id })
    .then((newPost) => res.status(201).json(newPost))
    .catch(() => res.status(500).json({ message: 'Alguns bugs comeram um pedaço dessa lógica :C' }));
});

router.get('/post', authValidation, async (_req, res) => {
  Posts.findAll({ include: { model: Users, as: 'user' }, attributes: { exclude: ['password'] } })
    .then((post) => res.status(200).json(post))
    .catch(() => res.status(500).json({ message: 'Os bugs passaram por aqui novamente :C' }));
});

router.get('/post/:id', authValidation, async (req, res) => {
  const { id } = req.params;
  Posts.findOne({
    where: { id }, include: { model: Users, as: 'user' }, attributes: { exclue: ['password'] },
  }).then((post) => {
    if (!post) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    res.status(200).json(post);
  }).catch(() => res.status(500).json({ message: 'esses bugs danados tsc tsc' }));
});

router.put('/post/:id',
  authValidation,
  postValidation,
  postAuth,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      await Posts.update({ title, content }, { where: { id } });
      const post = await Posts.findOne({ where: { id },
        attributes: { exclude: [
          'id',
          'publised',
          'updated',
        ] } });
      res.status(200).json(post);
    } catch (e) {
      res.status(500).json(e.message);
    }
  });
module.exports = router;
