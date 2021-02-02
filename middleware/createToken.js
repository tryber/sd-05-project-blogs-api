const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'thisIsMySecret';

const jwtConfig = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);

  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};
