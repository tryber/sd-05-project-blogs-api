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
  async (req, res) => {
    try {
      const listPosts = await Post.findAll({ include: { model: User, as: 'user' } });
      res.status(200).json(listPosts);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'DEU RUIM' });
    }
  },
);

// 8 - Sua aplicação deve ter o endpoint GET /post/:id
postRouter.get(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const uniquePost = await Post.findByPk(req.params.id, {
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
postRouter.put(
  '/:id',
  verifyToken,
  verifyJoi(schema),
  (async (req, res) => {
    try {
      const { id } = req.params;
      console.log(typeof (id), 'CHEGUEI RAPAZIADA');
      // const uniquePostById = await Post.findByPk(id);

      // Verifica se o usuário é o mesmo que quer editar o post
      const userAuth = req.userPayload.id;
      console.log('DEUS SOCORRO', typeof (userAuth));

      if (Number(id) !== userAuth) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }

      // Atualização do Post
      const { title, content } = req.body;

      await Post.update({ title, content }, { where: { id } });
      return res.status(200).json({ title, content, userId: Number(id) });
    } catch (error) {
      return res.status(401).json({ message: 'DEU RUIM' });
    }
  }),
);

// 11 - Sua aplicação deve ter o endpoint DELETE /post/:id
postRouter.delete(
  '/:id',
  verifyToken,
  (async (req, res) => {
    try {
      const { id } = req.params;
      console.log(typeof (id), 'CHEGUEI RAPAZIADA');

      // Verifica post existente
      const postExist = await Post.findOne({ where: { id } });
      console.log(postExist);
      if (!postExist) {
        return res.status(404).json({ message: 'Post não existe' });
      }

      const userAuth = req.userPayload.id;
      if (postExist.dataValues.id !== userAuth) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }

      await Post.destroy({ where: { id } });
      return res.status(204).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
      return res.status(401).json({ message: 'DEU RUIM' });
    }
  }),
);
module.exports = postRouter;
