const { Router } = require('express');

const jwt = require('jsonwebtoken');

const loginRouter = Router();

const checkEmail = require('../middlewares/emailMiddleware');
const checkPwd = require('../middlewares/pwdMiddleware');
const checkToken = require('../middlewares/tokenMiddleware');

const emptyField = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (email === "") {
    return res.status(400).json({
      message: '"email" is not allowed to be empty',
    });
  }
  
  if (password === "") {
    return res.status(400).json({
      message: '"password" is not allowed to be empty',
    });
  }

  next();
}

const middlewares = [checkEmail, checkPwd];

const secret = 'secretPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

loginRouter.post('/', emptyField, middlewares, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await checkToken(email, password);

    const payload = {
      // Issuer => Quem emitiu o token
      iss: 'post_api',
      // Audience => Quem deve aceitar este token
      aud: 'identify',
      // Subject => A quem pertence esse token
      // sub: user._id,
      user,
    }

    const token = jwt.sign(payload, secret, jwtConfig);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: `Intern Error: ${error}` });
  }
});

module.exports = loginRouter;
