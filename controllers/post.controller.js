const { Router } = require('express');
const { checkToken, decodePayload } = require('../auth/jwt.auth');
const { postServices } = require('../services');

const postRouter = Router();

const TOKEN_NOT_FOUND = {
  name: 'TokenNotFoundError',
  message: 'Token não encontrado',
  status: 401,
};

const INVALID_TOKEN = {
  name: 'InvalidTokenError',
  message: 'Token expirado ou inválido',
  status: 401,
};

postRouter.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const token = req.headers.authorization;

    if (!token) return next(TOKEN_NOT_FOUND);
    checkToken(token);

    const { payload: { id: userId } } = decodePayload(token);
    const newPost = await postServices.createPost(userId, title, content);

    res.status(201).json(newPost);
  } catch (error) {
    if (error.message === 'jwt malformed') return next(INVALID_TOKEN);
    next(error);
  }
});

postRouter.get('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(TOKEN_NOT_FOUND);
    checkToken(token);

    const posts = await postServices.findAllPosts();

    res.status(200).json(posts);
  } catch (error) {
    if (error.message === 'jwt malformed') return next(INVALID_TOKEN);
    next(error);
  }
});

module.exports = postRouter;
