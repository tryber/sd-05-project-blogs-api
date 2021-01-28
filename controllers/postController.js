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

postRouter.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;

    const post = await services.getPostById(id);

    return post.error
      ? res.status(post.code).json({ message: post.message })
      : res.status(200).json(post);
  }),
);

postRouter.delete(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await services.deletePost(id, userId);

    return post.error
      ? res.status(post.code).json({ message: post.message })
      : res.status(204).json({ message: 'Post apagado' });
  }),
);

module.exports = postRouter;
