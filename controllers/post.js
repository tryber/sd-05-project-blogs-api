const express = require('express');

const rescue = require('express-rescue');

const Joi = require('joi');

const postRouter = express.Router();

const { User, Post } = require('../models');

const { verifyToken } = require('../middlewares/verifyToken');

// const { createToken } = require('../services/createToken');

const verifyJoi = require('../middlewares/verifyJoi');

const schema = Joi.object({
  title: Joi.string().required().not().empty(),
  content: Joi.string().required().not().empty(),
});

// 6 - Sua aplicação deve ter o endpoint POST /post

postRouter.post(
  '/',
  verifyToken,
  verifyJoi(schema),
  async (req, res) => {
    const { title, content } = req.body;
    const { id: userId } = req.userPayload;
    try {
      await Post.create({ title, content, userId, published: Date.now(), updated: Date.now() });
      return res.status(201).json({ title, content, userId });
    } catch (error) {
      return res.status(401).json({ message: 'DEU RUIM' });
    }
  },
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
  rescue(async (req, res) => {
    const { id } = req.params;
    const uniquePostById = await User.findByPk(id);

    // Verifica se o usuário é o mesmo que quer editar o post
    const userAuthenticated = req.userPayload.id;
    console.log(userAuthenticated);

    if (uniquePostById.userId !== userAuthenticated) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    // Atualização do Post
    const { title, content } = req.body;
    await Post.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId: uniquePostById.userId });
  }),
);

module.exports = postRouter;
