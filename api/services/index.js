const jwt = require('jsonwebtoken');
const secretkey = require('../models/secretKey');

const secret = secretkey();

module.exports = async (user) => {
  const jwtConfig = {
    expiresIn: '30min',
    algorithm: 'HS256',
  };

  const { password, ...withoutPassword } = user;
  const usuario = withoutPassword;
  console.log('sem password:', usuario);

  const token = jwt.sign({ data: usuario }, secret, jwtConfig);
  return token;
};
