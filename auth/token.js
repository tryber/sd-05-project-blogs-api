const jwt = require('jsonwebtoken');
const secret = require('./secret');

const headers = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, secret);

  return verifiedToken;
};

module.exports = { createToken, verifyToken };
