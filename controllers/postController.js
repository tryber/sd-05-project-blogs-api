const { Router } = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = Router();

const { Post, User } = require('../models');
// const { emailLogin, pwdLogin } = require('../middlewares/loginMiddleware');
// const middlewares = [emailLogin, pwdLogin];

postRouter.post('/', tokenMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id: userId } = req.payload;
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }

    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }

    const post = await Post.create({
      attributes: { exclude: ['id'] },
      title,
      content,
      userId,
    });

    return res.status(201).json(post);
  } catch (error) {
    console.log('estou no catch', error);
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

postRouter.get('/', tokenMiddleware, async (req, res) => {
  try {
    const listPosts = await Post.findAll({
      where: { userId: req.payload.id },
      include: { model: User, as: 'user', attributes: { exclude: 'password' } },
      attributes: { exclude: 'userId' },
    });

    return res.status(200).json(listPosts);
  } catch (error) {
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

postRouter.get('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const postById = await Post.findOne({
    where: { userId: req.payload.id, id },
    include: { model: User, as: 'user', attributes: { exclude: 'password' } },
    attributes: { exclude: 'userId' },
  });
  if (!postById) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(postById);
});

postRouter.put('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userLogged = req.payload;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  const postFound = await Post.findOne({ where: { id } });

  if (!postFound) return res.status(404).json({ message: 'Post não existe' });

  if (userLogged.id !== postFound.dataValues.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  await Post.update(
    { title, content },
    {
      where: { userId: userLogged.id, id },
    },
  );

  return res.status(200).json({ title, content, userId: req.payload.id });
});

postRouter.delete('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const userLogged = req.payload;
  const postFound = await Post.findOne({
    where: { id },
  });
  if (!postFound) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (userLogged.id !== postFound.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  const deletePost = await Post.destroy({ where: { id, userId: userLogged.id } });

  return res.status(204).json(deletePost);
});

module.exports = postRouter;
