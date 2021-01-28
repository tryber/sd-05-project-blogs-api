const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/postServices');
const { validateToken } = require('../authentication');

const postRouter = Router();

postRouter.post(
  '/',
  validateToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.payload;

    const newPost = await services.createPost(title, content, id);

    return newPost.error
      ? res.status(newPost.code).send({ message: newPost.message })
      : res.status(201).json(newPost);
  }),
);

postRouter.get(
  '/',
  validateToken,
  rescue(async (_req, res) => {
    const posts = await services.getAllPosts();

    return res.status(200).json(posts);
  }),
);

module.exports = postRouter;
