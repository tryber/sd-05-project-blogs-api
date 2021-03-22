const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET || 'umasenhasecreta';

function createToken(user) {
  const { password: _, ...payload } = user;

  const jwtConfig = {
    expiresIn: '365d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
}

function verifyToken(req, res, next) {
  const { authorization: token } = req.headers;
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = jwt.verify(token, secret);
    req.payload = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
}

module.exports = { createToken, verifyToken };