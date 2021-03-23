const jwt = require('jsonwebtoken');

const secret = 'senhadificil';

const createToken = async (user) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const payload = {
    userData: userWithoutPassword,
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  // Retorna token ao usuário
  return token;
};
const decodeToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, decodeToken };
