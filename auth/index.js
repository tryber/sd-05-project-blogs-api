const { createToken, verifyToken } = require('./token');
const secret = require('./secret');

module.exports = { createToken, verifyToken, secret };
