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
  '/search',
  validateToken,
  rescue(async (req, res) => {
    const query = req.query.q;
    console.log(query, 'LOOK AT MEEEEEEEEE!!');
    const posts = await services.searchPosts(query);

    return posts
      ? res.status(200).json(posts)
      : res.status(500).json({ message: 'Something went wrong' });
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

postRouter.put(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.payload.id;

    const update = await services.updatePost(id, title, content, userId);

    if (update.error) return res.status(update.code).json({ message: update.message });

    return update[0] === 0
      ? res.status(401).json({ message: 'Usuário não autorizado' })
      : res.status(200).json(update);
  }),
);

postRouter.delete(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const userId = req.payload.id;

    const post = await services.deletePost(id, userId);

    return post.error
      ? res.status(post.code).json({ message: post.message })
      : res.status(204).json({ message: 'Post apagado' });
  }),
);

module.exports = postRouter;
