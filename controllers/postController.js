const express = require('express');
const { Post, User } = require('../models');
// const { Op } = require('sequelize');
const auth = require('../middlewares/token');
const createPost = require('../middlewares/createPost');
const getPost = require('../middlewares/getPost');
const deletar = require('../middlewares/deletar');
const atualizar = require('../middlewares/atualizar');
const { validTitle, validContent } = require('../middlewares/validUpdate');

const routePost = express.Router();

routePost.post('/', auth, createPost, async (req, res) => {
  try {
    const { title, content } = req.body;
    // console.log('aquiiii', req.user);
    const { id } = req.user;
    const newPost = await Post.create({ title, content, userId: id });
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routePost.get('/', auth, async (req, res) => {
  try {
    const getAll = await Post.findAll({ include: { model: User, as: 'user' } });
    res.status(200).json(getAll);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routePost.get('/:id', auth, getPost, async (req, res) => {
  try {
    const { postData } = req;
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

routePost.delete('/:id', auth, deletar, async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

routePost.put('/:id', auth, atualizar, async (req, res) => {
  try {
    // console.log('vinicius', req.user);
    const { title, content } = req.body;
    const { id } = req.params;
    if (validTitle(title).status) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (validContent(content).status) {
      return res.status(400).json({ message: '"content" is required' });
    }
    const upPost = await Post.update({ title, content }, { where: { id } });
    res.status(200).json({ content, title, userId: Number(id) });
    if (!upPost) {
      return res.status(404).json({ message: 'Não' });
    }
  } catch (err) {
    // console.log(err, 'ferrou tudo');
    res.status(500).send({ message: 'Algo deu errado' });
  }
});

/* routePost.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    const searchPost = await Post.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
      },
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    });
    return res.status(200).json(searchPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Algo deu errado');
  }
});
*/

module.exports = routePost;
