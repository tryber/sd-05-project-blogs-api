const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const secret = 'lyraah';

const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({
        message: '"displayName" length must be at least 8 characters long',
      });
  }
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  const testEmail = validEmail.test(email);
  if (!testEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }
  next();
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  const findByEmail = await Users.findOne({
    where: {
      email, password,
    },
  });
  if (!findByEmail) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  req.userInformation = findByEmail.dataValues;
  next();
};

const authValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const user = await jwt.verify(authorization, secret);
    req.userInformation = user;
    next();
  } catch (_e) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { userValidation, loginValidation, authValidation };
