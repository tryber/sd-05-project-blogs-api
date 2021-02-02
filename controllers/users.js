const express = require('express');
const rescue = require('express-rescue');
const verifyToken = require('../middlewares/verifyToken');
/* const { verifyNewUser, verifyNewAdmin } = require('../services/users'); */
const { User } = require('../models');

const usersRouter = express.Router();

// 1 - Sua aplicação deve ter o endpoint POST /user
usersRouter.post(
  '/',
  rescue(async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const newUser = await User.create({ displayName, email, password, image });

    return res.status(201).json({ user: newUser });
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
