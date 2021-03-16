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
      console.log('postController L 18', req.body);
      const { id } = req.payload;
      console.log('postController L 20', req.payload);
      const post = await Posts.create({ title, content, userId: id });
      console.log('postController L22', post);
      return res.status(201).json(post);
    } catch (err) {
      if (err) return res.status(400).json({ message: 'Algo deu errado' });
    }
  });

router.get('/',
  verifyJWT,
  async (_req, res) => {
    const allPosts = await Posts.findAll({
      include: [{ model: Users, as: 'user' }],
      attributes: { exclude: ['userId'] },
    });
    if (!allPosts) return res.status(404).json({ message: 'None Posts on database.' });
    return res.status(200).json(allPosts);
  });

router.get('/:id',
  verifyJWT,
  async (req, res) => {
    const { id } = req.params;
    const post = await Posts.findByPk(id, {
      include: [{ model: Users, as: 'user' }],
      attributes: { exclude: ['userId'] },
    });
    if (post === null) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(post);
  });

router.put('/:id',
  verifyJWT,
  validateTitle,
  validateContent,
  async (req, res) => {
    const { title, content } = req.body;
    const userId = req.payload.id;
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
      if (!post) return res.status(404).json({ message: 'Post not found' });
      return res.status(200).json(post);
    } catch (err) {
      return res.status(404).json({ message: 'caiu no catch' });
    }
  });

module.exports = router;
