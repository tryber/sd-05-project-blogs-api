const express = require('express');

const rescue = require('express-rescue');

const Joi = require('joi');

const loginRouter = express.Router();

const { User } = require('../models');

// const { verifyToken } = require('../middlewares/verifyToken');

const { createToken } = require('../services/createToken');

const verifyJoi = require('../middlewares/verifyJoi');

const schema = Joi.object({
  email: Joi.string().required().not().empty(),
  password: Joi.string().required().not().empty(),
});

// 2 - Sua aplicação deve ter o endpoint POST /login

loginRouter.post(
  '/',
  verifyJoi(schema),

  rescue(async (req, res) => {
    const { email, password } = req.body;

    const userLogin = await User.findOne({ where: { email, password } });

    if (!userLogin) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const token = await createToken(userLogin);

    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
