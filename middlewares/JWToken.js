const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.SECRET || 'secretPassword';
const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, jwtConfig);

const verifyToken = (token) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    // console.log(verifiedToken);
    return verifiedToken;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createToken,
  verifyToken,
};
