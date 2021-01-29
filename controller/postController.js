const express = require('express');
const MiddleErrorUser = require('../middlewares/middlewareErrorUser');
const MiddleToken = require('../middlewares/tokenMiddleware');
const MiddleContent = require('../middlewares/validContent');
const MiddleTitle = require('../middlewares/validTitle');
const { Posts } = require('../models');
const createUsers = require('../models/Users');

const postRouter = express.Router();

const middleWarePost = [MiddleTitle, MiddleContent];

postRouter.post('/', middleWarePost, MiddleToken, async (req, res) => {
  const { content, title } = req.body;
  const user = req.payload;
  try {
    const result = await Posts.create({ content, title, userId: user.id },
      { includes: { model: createUsers, as: user } });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});
/*
postRouter.get('/:id', MiddleToken, async (req, res, next) => {
  const { id } = req.params;
  const result = await Posts.findOne({ where: { id } });
  if (!result) next({ status: 404, message: 'Usuário não existe' });
  res.status(200).json(result);
});

postRouter.get('/', MiddleToken, async (req, res) => {
  const result = await Posts.findAll();
  console.log(result);
  res.status(200).json(result);
});

postRouter.delete('/me', MiddleToken, async (req, res) => {
  const user = req.payload;
  await Posts.destroy({ where: { id: user.id } });
  res.status(204).json();
});
*/

postRouter.use(MiddleErrorUser);

module.exports = postRouter;
