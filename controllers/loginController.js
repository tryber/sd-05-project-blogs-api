const { Router } = require('express');

const jwt = require('jsonwebtoken');

const loginRouter = Router();

const { User } = require('../models');
const { emailLogin, pwdLogin } = require('../middlewares/loginMiddleware');

const middlewares = [emailLogin, pwdLogin];

const secret = 'secretPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

loginRouter.post('/', middlewares, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) { return res.status(400).json({ message: 'Campos inválidos' }); }

    if (password !== user.dataValues.password) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    const payload = {
      iss: 'post_api', // Issuer => Quem emitiu o token
      aud: 'identify', // Audience => Quem deve aceitar este token
      user, // sub: user._id
    };

    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

module.exports = loginRouter;
