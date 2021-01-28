const express = require('express');
const { Posts, Users } = require('../models');
const {
  postValidation,
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
    .catch((e) => res.status(500).json(e.message));
});

module.exports = router;
