const email = require('./ValidaEmail');
const password = require('./ValidaPassword');
const { createToken, verifyToken } = require('./TokenCreate');
const displayName = require('./ValidaDisplayName');

module.exports = {
  email,
  password,
  createToken,
  verifyToken,
  displayName,
};
