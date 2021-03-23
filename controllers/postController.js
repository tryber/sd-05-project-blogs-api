const { Router } = require('express');
const { Op } = require('sequelize');

const Joi = require('joi');

const { Users, Posts } = require('../models');
const tokenValidation = require('../middleWare/tokenValidation');
const errorHandler = require('../middleWare/errorHandler');

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

postsRouter.get('/search', tokenValidation, async (req, res) => {
  const { query = '' } = req.query;
  const { id } = req.payload;
  try {
    const search = await Posts.findAll({
      where: {
        userId: id,
        [Op.or]: [
          { title: { [Op.like]: `'%'${query}'%'` } },
          { content: { [Op.like]: `'%'${query}'%'` } },
        ],
      },
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    });
    return res.status(200).json(search);
  } catch (error) {
    return res.status(400).json({ message: 'Yoshida tava chapado' });
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

postsRouter.put('/:id', errorHandler(schema), tokenValidation, async (req, res) => {
  const { id } = req.params;
  const { content, title } = req.body;
  try {
    const updatePost = await Users.findOne({ where: { id } });
    if (Number(id) !== req.payload.id) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    updatePost.title = title;
    updatePost.content = content;

    await updatePost.save();

    console.log(updatePost);
    return res.status(200).json({ content, title, userId: Number(id) });
  } catch (error) {
    return res.status(400).json({ message: 'deu ruim' });
  }
});

postsRouter.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  try {
    const postExists = await Posts.findOne({ where: { id } });
    if (!postExists) return res.status(404).json({ message: 'Post não existe' });
    const userOwner = postExists.dataValues.userId;
    const userToken = req.payload.id;
    if (userOwner !== userToken) return res.status(401).json({ message: 'Usuário não autorizado' });
    await Posts.destroy({ where: { id } });
    return res.status(204).json({ message: 'Deletado com sucesso!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'deu ruim' });
  }
});

module.exports = postsRouter;
