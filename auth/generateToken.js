require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = async (userData) => {
  const { password: _, ...payload } = userData;

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = {
  generateToken,
};
