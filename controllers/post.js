const { Router } = require('express');
const { verifyToken } = require('../midllewares/jwt');
const { verifyTitle, verifyContent } = require('../midllewares/validation');
// const { createToken } = require('../midllewares/jwt');
const { Post } = require('../models');

const postRouter = Router();

postRouter.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.body, 'requisição');
    const { id } = req.payload;
    verifyTitle(title);
    verifyContent(content);
    const post = await Post.create({ title, content, userId: id });
    console.log(post, 'post');
    return res.status(201).json(post);
  } catch (err) {
    console.log(err, 'erro')
    return res.status(err.status).json({message: err.message});
  }
})

module.exports = postRouter;
