const express = require('express');

const rescue = require('express-rescue');

const postRouter = express.Router();

const { User, Post } = require('../models');

const { verifyToken } = require('../middlewares/verifyToken');

// const { createToken } = require('../services/createToken');

// 6 - Sua aplicação deve ter o endpoint POST /post

postRouter.post(
  '/',
  verifyToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id: idUser } = req.payload.userData;

    await Post.create({ title, content, idUser, published: Date.now(), updated: Date.now() });

    return res.status(201).json({ title, content, idUser });
  }),
);

// 7 - Sua aplicação deve ter o endpoint GET /post
// Ref include https://sequelize.org/master/manual/eager-loading.html

postRouter.get(
  '/',
  verifyToken,
  rescue(async (req, res) => {
    const listPosts = await User.findAll({ include: { model: User, as: 'user' } });
    res.status(200).json(listPosts);
  }),
);

// 8 - Sua aplicação deve ter o endpoint GET /post/:id
postRouter.get(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const uniquePost = await User.findByPk(req.params.id, {
      include: {
        model: User,
        as: 'user',
      },
    });

    if (!uniquePost) return res.status(404).json({ message: 'Post não existe' });

    return res.status(200).json(uniquePost);
  }),
);

// 9 - Sua aplicação deve ter o endpoint PUT /post/:id
postRouter.get(
  '/:id',
  verifyToken,
  // rescue(async (req, res) => {
  //   const uniquePost = await User.findByPk(req.params.id, {
  //     include: {
  //       model: User,
  //       as: 'user',
  //     },
  //   });

  //   if (!uniquePost) return res.status(404).json({ message: 'Post não existe' });

  //   return res.status(200).json(uniquePost);
  }),
);

module.exports = postRouter;
