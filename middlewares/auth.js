const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || 'luca';

const headers = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (payload) => jwt.sign(payload, secret, headers);
const validateToken = (token) => jwt.verify(token, secret);

const middlewareToken = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (token === undefined) return res.status(401).json({ message: 'Token não encontrado' });
    if (token === '') return res.status(401).json({ message: 'Token não encontrado' });
    const payload = validateToken(token);
    req.payload = payload;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { createToken, validateToken, middlewareToken };
