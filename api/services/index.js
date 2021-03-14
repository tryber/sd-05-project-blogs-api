const jwt = require('jsonwebtoken');
const secretkey = require('../models/secretKey');

const secret = secretkey();

module.exports = async (user) => {
  const jwtConfig = {
    expiresIn: '30min',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};
