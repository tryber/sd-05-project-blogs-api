const { Router } = require('express');
const tokenMiddleware = require('../middlewares/tokenMiddleware');

const postRouter = Router();

const { Post } = require('../models');
const createUser = require('../models/Users');
// const { emailLogin, pwdLogin } = require('../middlewares/loginMiddleware');
// const middlewares = [emailLogin, pwdLogin];

postRouter.post('/', tokenMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.payload;

    if (!title) { return res.status(400).json({ message: '"title" is required' }); }

    if (!content) { return res.status(400).json({ message: '"content" is required' }); }

    const post = await Post.create(
      { title, content, userId: user.id },
      { includes: { model: createUser, as: user } },
    );

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

module.exports = postRouter;
