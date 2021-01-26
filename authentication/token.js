const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || '';

const headers = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);
const validateToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, validateToken };
