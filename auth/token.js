require('dotenv').config();

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'segredinho nosso...';

const generateToken = async (user) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const payload = { userWithoutPassword };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

const decodeToken = (token) => jwt.verify(token, secret);

module.exports = { generateToken, decodeToken };
