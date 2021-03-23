const { Router } = require('express');

const Joi = require('joi');

const { Users, Posts } = require('../models');
const tokenValidation = require('../middleWare/tokenValidation');
const errorHandler = require('../middleWare/errorHandler');
const createToken = require('../services/createToken');

const postsRouter = Router();

const schema = Joi.object({
  title: Joi.string().required().not().empty(),
  content: Joi.string().required().not().empty(),
});

/* Como ensinado pela nat, o errorHandler verifica o schema do Joi e retorna as mensagens
 de erro conforme especificado */
postsRouter.post('/', tokenValidation, errorHandler(schema), async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload;
  try {
    const newPost = await Posts.create({ title, content, userId: id });
    return res.status(201).json(newPost.dataValues);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

postsRouter.get('/', tokenValidation, async (req, res) => {
  try {
    const posts = await Posts.findAll({ include: { model: Users, as: 'user' } });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

postsRouter.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Posts.findByPk(id, { include: { model: Users, as: 'user' } });
    console.log(posts, 'SSIIIIIIDDDDD');
    if (!posts) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

module.exports = postsRouter;
