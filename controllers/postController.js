const { Router } = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = Router();

const { Post } = require('../models');
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

module.exports = postRouter;
