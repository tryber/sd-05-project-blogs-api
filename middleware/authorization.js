const jwt = require('jsonwebtoken');

const { SECRET } = require('../helper/token');

const verifyJWT = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.payload = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  return next();
};

module.exports = { verifyJWT };
