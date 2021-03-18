const jwt = require('jsonwebtoken');

// payload, secret, header
const SECRET = 'weeee';

const header = { expiresIn: '8h', algorithm: 'HS256' };

const createToken = (payload) => {
  const token = jwt.sign(payload, SECRET, header);
  return token;
};

module.exports = { SECRET, createToken };
