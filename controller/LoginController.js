const { Router } = require('express');
const rescue = require('express-rescue');
const services = require('../services/loginServices');
const { createToken } = require('../middlewares/auth');
const errMiddleware = require('../middlewares/err');

const loginRouter = Router();

loginRouter.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;
    const userLogin = await services.userLogin(email, password);
    console.log('L14 logincontroller', userLogin);
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

loginRouter.use(errMiddleware.loginValidator);

module.exports = loginRouter;
