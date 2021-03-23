require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'quemehocanto';
const config = { algorithm: 'HS256', expiresIn: '5d' };

const createToken = (payload) => jwt.sign(payload.dataValues, secret, config);
const verifyToken = (token) => jwt.verify(token, secret);

module.exports = { createToken, verifyToken };
