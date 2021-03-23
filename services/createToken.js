const jwt = require('jsonwebtoken');
require('dotenv').config();
// secret local ou um genérico para o projeto
const secret = process.env.SECRET || 'placeholder';

const createToken = (user) => {
  const { password: _, ...payload } = user;
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = createToken;
