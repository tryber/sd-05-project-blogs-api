const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/loginServices');
const { createToken } = require('../authentication/token');

const loginRouter = Router();

loginRouter.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await services.userLogin(email, password);

    if (!userLogin) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    if (userLogin.error) {
      return res.status(userLogin.code).json({ message: userLogin.message });
    }

    const token = await createToken(userLogin.dataValues);

    return res.status(200).json({ token });
  }),
);

module.exports = loginRouter;
