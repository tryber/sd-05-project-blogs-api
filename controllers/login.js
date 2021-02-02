const express = require('express');
const rescue = require('express-rescue');
const Joi = require('joi');
const { generateToken } = require('../auth/token');
const verifyUser = require('../middlewares/verifyUser');
const { User } = require('../models');

const loginRouter = express.Router();

const schema = Joi.object({
  email: Joi.string().required().not().empty(),
  password: Joi.string().required().not().empty(),
});

// 2 - Sua aplicação deve ter o endpoint POST /login
loginRouter.post(
  '/',
  verifyUser(schema),
  rescue(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const token = generateToken(user);

    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
