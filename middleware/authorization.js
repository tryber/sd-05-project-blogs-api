const jwt = require('jsonwebtoken');

const { SECRET } = require('../helper/token');

const errorMessage = (message) => ({ message });

const verifyJWT = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json(errorMessage('Token não encontrado'));
  try {
    const decoded = jwt.verify(token, SECRET);
    req.payload = decoded;
    return next();
  } catch (error) {
    return res.status(401).json(errorMessage('Token expirado ou inválido'));
  }
};

module.exports = { verifyJWT };
