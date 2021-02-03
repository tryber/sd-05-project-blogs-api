const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.SECRET || 'mySecret';

const createToken = (userData) => {
  // id, displayName, email, image (default = "")
  const payload = userData;
  const configToken = {
    algorithm: 'HS256',
    expiresIn: '5d',
  };
  return jwt.sign(payload, secret, configToken);
};

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, verifyToken };
