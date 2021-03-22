const { Router } = require('express');
const { verifyToken } = require('../midllewares/jwt');
const { verifyTitle, verifyContent } = require('../midllewares/validationPost');
// const { createToken } = require('../midllewares/jwt');
const { Post, User } = require('../models');

const postRouter = Router();

postRouter.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.payload;
    verifyTitle(title);
    verifyContent(content);
    const post = await Post.create({ title, content, userId: id });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

postRouter.get('/', verifyToken, async (_req, res) => {
  try {
    const posts = await Post.findAll({ include: { model: User, as: 'user' } });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err, 'erro');
    return res.status(500).json({ message: 'Deu ruim' });
  }
});

postRouter.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOne({
      where: { id },
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    });
    if (!post) {
      return res.status(404).json({message: "Post não existe"})
    }
    return res.status(200).json(post);
  } catch (err) {
    console.log(err, 'erro');
    return res.status(500).json({ message: 'Deu ruim' });
  }
});

module.exports = postRouter;
