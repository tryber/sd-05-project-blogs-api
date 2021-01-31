const jwt = require('jsonwebtoken');

const secret = '12345678';

function createWebToken(payload) {
  const headers = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, headers);
  return token;
}

module.exports = {
  createWebToken,
};
