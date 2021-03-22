const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/postServices');
const { middlewareToken } = require('../middlewares/auth');

const postRouter = Router();

postRouter.post(
  '/',
  middlewareToken,
  rescue(async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.payload;

    const newPost = await services.create(title, content, id);

    return newPost.error
      ? res.status(newPost.code).send({ message: newPost.message })
      : res.status(201).json(newPost);
  }),
);

postRouter.get(
  '/',
  middlewareToken,
  rescue(async (_req, res) => {
    const posts = await services.getAll();

    return res.status(200).json(posts);
  }),
);

postRouter.get(
  '/:id',
  middlewareToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    const post = await services.getById(id);

    return post.error
      ? res.status(post.code).json({ message: post.message })
      : res.status(200).json(post);
  }),
);

module.exports = postRouter;
