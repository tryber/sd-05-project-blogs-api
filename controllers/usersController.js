const express = require('express');

const rescue = require('express-rescue');

const { User } = require('../models');

const userRouter = express.Router();
const {
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
  validateToken,
} = require('../middlewares');

const generateJWT = require('../services/generateToken');

// 1 - Sua aplicação deve ter o endpoint POST /user
// done with middlewares, service being better only when you need to manipulate return
userRouter.post(
  '/',
  validateName,
  validateEmail,
  validateNotExisting,
  validatePassword,
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const createdUser = await User.create({ displayName, email, password, image });
    const token = await generateJWT(createdUser);
    return res.status(201).json({ token });
  }),
);

// 3 - Sua aplicação deve ter o endpoint GET /user
userRouter.get(
  '/',
  validateToken,
  rescue(async (_req, res) => {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  }),
);

// 4 - Sua aplicação deve ter o endpoint GET /user/:id
userRouter.get(
  '/:id',
  validateToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const userById = await User.findByPk(id);
    // also possible: const userById = await User.findOne({ where: { id } });
    if (!userById) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(userById);
  }),
);

// 5 - Sua aplicação deve ter o endpoint DELETE /user/me
userRouter.delete(
  '/me',
  validateToken,
  rescue(async (req, res) => {
    const { email } = req.userPayload;
    // https://jwt.io/ to access the payload object structure
    // & validateToken middleware contains req.userPayload
    await User.destroy({ where: { email } });
    return res.status(204).send();
  }),
);

module.exports = userRouter;
