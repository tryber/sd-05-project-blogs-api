const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const { generateToken } = require('../auth/token');
const verifyToken = require('../middlewares/verifyToken');
const verifyWithJoi = require('../middlewares/verifyWithJoi');
/* const { verifyWithJoi, verifyNewAdmin } = require('../services/users'); */
const { User } = require('../models');

const usersRouter = express.Router();

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string(),
});

// 1 - Sua aplicação deve ter o endpoint POST /user
usersRouter.post(
  '/',
  verifyWithJoi(schema),
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const existentUser = await User.findOne({ where: { email } });

    if (existentUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    const newUser = await User.create({ displayName, email, password, image });

    const token = generateToken(newUser);

    return res.status(201).json({ token });
  }),
);

// 3 - Sua aplicação deve ter o endpoint GET /user
usersRouter.get(
  '/',
  verifyToken,
  rescue(async (req, res) => {
    const allUsers = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return res.status(200).json(allUsers);
  }),
);

// 4 - Sua aplicação deve ter o endpoint GET /user/:id
usersRouter.get(
  '/:id',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.params;
    const specificUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!specificUser) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }

    return res.status(200).json(specificUser);
  }),
);

// 5 - Sua aplicação deve ter o endpoint DELETE /user/me
usersRouter.delete(
  '/me',
  verifyToken,
  rescue(async (req, res) => {
    const { id } = req.payload.userData;
    await User.destroy({ where: { id } });

    return res.status(204).json();
  }),
);

module.exports = usersRouter;
