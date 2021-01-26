const jwt = require('jsonwebtoken');

const secret = 'tatubola';

function createToken(payload) {
  const headers = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, headers);
  return token;
}

module.exports = createToken;
