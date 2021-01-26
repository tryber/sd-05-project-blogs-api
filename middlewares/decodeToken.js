const jwt = require('jsonwebtoken');

const decodeToken = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

module.exports = decodeToken;
