require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || '';

function createToken(payload) {
  const headers = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  return jwt.sign(payload, secret, headers);
}

module.exports = createToken;
