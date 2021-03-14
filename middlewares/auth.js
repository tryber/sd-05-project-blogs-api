// consultado repo Hugo Leonardo Costa

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.SECRET || 'secretPassword';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const validaToken = async (token) => {
  const payload = jwt.validaToken(token, secret);
  return payload;
};

module.exports = {
  createToken,
  validaToken,
};
