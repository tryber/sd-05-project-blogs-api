const { Router } = require('express');
const { userServices } = require('../services');
const { checkToken } = require('../auth/jwt.auth');

const userRouter = Router();

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

userRouter.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const token = await userServices.registerUser(
      displayName,
      email,
      password,
      image,
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(TOKEN_NOT_FOUND);
    checkToken(token);

    const users = await userServices.findAllUsers();

    res.status(200).json(users);
  } catch (error) {
    if (error.message === 'jwt malformed') return next(INVALID_TOKEN);
    next(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(TOKEN_NOT_FOUND);
    checkToken(token);

    const user = await userServices.findUserById(req.params.id, token);

    res.status(200).json(user);
  } catch (error) {
    if (error.message === 'jwt malformed') return next(INVALID_TOKEN);
    next(error);
  }
});

userRouter.delete('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return next(TOKEN_NOT_FOUND);
    checkToken(token);

    const { payload: { id } } = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );

    await userServices.deleteUser(id);

    res.sendStatus(204);
  } catch (error) {
    if (error.message === 'jwt malformed') return next(INVALID_TOKEN);
    next(error);
  }
});

module.exports = userRouter;
