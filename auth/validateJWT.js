const jwt = require('jsonwebtoken');

const secret = 'tatubola';

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateJWT;
