const express = require('express');

const { Op } = require('sequelize');

const router = express.Router();

const { Posts, Users } = require('../models');
const { verifyJWT } = require('../middleware/authorization');
const { validateTitle, validateContent } = require('../middleware/postValidation');

router.post('/',
  verifyJWT,
  validateTitle,
  validateContent,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id: userId } = req.user;
      const post = await Posts.create({ title, content, userId });
      console.log('postController L22', post);
      return res.status(201).json(post);
    } catch (err) {
      return res.status(500).json({ message: 'Algo deu errado' });
    }
  });

router.get('/',
  verifyJWT,
  async (_req, res) => {
    try {
      const allPosts = await Posts.findAll({
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        attributes: { exclude: ['userId'] },
      });
      return res.status(200).json(allPosts);
    } catch (err) {
      return res.status(500).json({ message: 'Erro no catch' });
    }
  });

router.get('/:id',
  verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const post = await Posts.findByPk(id, {
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      attributes: { excludes: ['userId'] },
    });
    if (post === null) return res.status(404).json({ message: 'Post não existe' });
    return res.status(200).json(post);
  });

router.put('/:id',
  verifyJWT,
  validateTitle,
  validateContent,
  async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;
    console.log('aqui L56', userId);
    const { id } = req.params;
    console.log('aqui L56', id);
    const updatedPost = await Posts.update({ title, content, userId }, { where: { id, userId } });
    if (updatedPost[0] === 0) return res.status(401).json({ message: 'Usuário não autorizado' });
    const postUpdated = await Posts.findOne({
      where: { id },
    });
    return res.status(200).json(postUpdated);
  });

router.get('/search',
  verifyJWT,
  async (req, res) => {
    try {
      const { q } = req.query;
      console.log('aqui no q', q);
      const post = await Posts.findAll({
        where: {
          [Op.or]: [{ title: { [Op.like]: `%${q}%` } },
            { content: { [Op.like]: `%${q}%` } },
          ],
        },
        include: [{ model: Users, as: 'user' }],
        attributes: { exclude: ['userId'] },
      });
      console.log('post aqui na L88', post);
      if (!post) return res.status(404).json({ message: 'Post não existe' });
      return res.status(200).json(post);
    } catch (err) {
      return res.status(404).json({ message: 'caiu no catch' });
    }
  });

router.delete('/:id',
  verifyJWT,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const post = await Posts.findByPk(id);
      console.log('DELETE L 103', post);
      if (!post) return res.status(404).json({ message: 'Post não existe' });
      console.log('PASSOU AQUI NA L 107');
      if (post.dataValues.userId !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });
      await Posts.destroy({ where: { id, userId } });
      return res.sendStatus(204);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: 'Erro no catch' });
    }
  });

module.exports = router;
