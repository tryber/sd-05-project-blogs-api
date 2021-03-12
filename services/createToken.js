const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = async (user) => {
  const secret = 'shhhh...é segredo';

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  const userWithoutPassword = user;
  delete userWithoutPassword.password;
  delete userWithoutPassword.displayName;
  delete userWithoutPassword.image;
  const payload = userWithoutPassword;

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = createToken;
