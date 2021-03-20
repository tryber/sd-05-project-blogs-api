const jwt = require('jsonwebtoken');

const secret = 'algumasenha';

const headers = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const getToken = (payload) => {
  const token = jwt.sign(payload, secret, headers);

  return token;
};

const validToken = (token) => {
  const tokenIsValid = jwt.verify(token, secret);

  return tokenIsValid;
};

module.exports = {
  getToken,
  validToken,
};
