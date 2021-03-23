const jwt = require('jsonwebtoken');
require('dotenv').config();
// secret local ou um genérico para o projeto
const secret = process.env.SECRET || 'placeholder';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = jwt.verify(authorization, secret);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
