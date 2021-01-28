require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET || '';

function validateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token não encontrado' });

  try {
    const payload = jwt.verify(token, secret);
    req.payload = payload;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
}

module.exports = validateToken;
