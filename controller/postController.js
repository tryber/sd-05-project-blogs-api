const express = require('express');
const { Op } = require('sequelize');
const MiddleErrorUser = require('../middlewares/middlewareErrorUser');
const MiddleToken = require('../middlewares/tokenMiddleware');
const MiddleContent = require('../middlewares/validContent');
const MiddleTitle = require('../middlewares/validTitle');
const { Post, User } = require('../models');

const postRouter = express.Router();

const middleWarePost = [MiddleTitle, MiddleContent];

postRouter.post('/', middleWarePost, MiddleToken, async (req, res) => {
  const { content, title } = req.body;
  const user = req.payload;
  try {
    const result = await Post.create(
      { content, title, userId: user.id },
      { attributes: { exclude: ['id'] } },
    );
    return res.status(201).json({ title, content, userId: result.userId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

postRouter.get('/', MiddleToken, async (req, res, next) => {
  const result = await Post.findAll({
    where: { userId: req.payload.id },
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  if (!result) return next({ status: 404, message: 'Usuário não existe' });
  return res.status(200).json(result);
});

postRouter.get('/search', MiddleToken, async (req, res) => {
  const { q = '' } = req.query;
  const result = await Post.findAll({
    where: {
      [Op.and]: [
        { userId: req.payload.id },
        { [Op.or]: [{ title: { [Op.substring]: q } }, { content: { [Op.substring]: q } }] },
      ],
    },
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  if (!result) return res.status(200).json([]);
  return res.status(200).json(result);
});

/* {
      [Op.and]: [
        { userId: req.payload.id },
        { [Op.or]: [{ title: { [Op.like]: q } }, { content: { [Op.like]: q } }] },
      ],
    } */

postRouter.get('/:id', MiddleToken, async (req, res, next) => {
  const result = await Post.findOne({
    where: { userId: req.payload.id, id: req.params.id },
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  if (!result) return next({ status: 404, message: 'Post não existe' });
  return res.status(200).json(result);
});

postRouter.put('/:id', MiddleToken, middleWarePost, async (req, res, next) => {
  const { content, title } = req.body;
  const checkPost = await Post.findOne({
    where: { id: req.params.id },
  });
  if (!checkPost) return next({ status: 404, message: 'Post não existe' });
  if (checkPost.userId !== req.payload.id) {
    return next({ status: 401, message: 'Usuário não autorizado' });
  }
  const result = await Post.update(
    { content, title },
    {
      where: { id: checkPost.id },
    },
  );
  if (!result) {
    return next({ status: 404, message: 'Post não existe/Ao atualizar' });
  }
  return res.status(200).json({ content, title, userId: checkPost.userId });
});

postRouter.delete('/:id', MiddleToken, async (req, res, next) => {
  const user = req.payload;
  const lookPost = await Post.findOne({ where: { id: req.params.id } });
  if (!lookPost) {
    return next({ status: 404, message: 'Post não existe' });
  }
  const { dataValues } = lookPost;
  if (dataValues.userId !== user.id) {
    return next({ status: 401, message: 'Usuário não autorizado' });
  }
  await Post.destroy({ where: { id: req.params.id } });
  res.status(204).json();
});

postRouter.use(MiddleErrorUser);

module.exports = postRouter;
