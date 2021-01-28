const token = require('jsonwebtoken');

const secret = 'localiza';

function createToken(payload) {
  const headers = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const JWtoken = token.sign(payload, secret, headers);
  return JWtoken;
}

module.exports = createToken;
