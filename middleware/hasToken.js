const jwt = require('jsonwebtoken');

require('dotenv').config();

const hasToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Token não encontrado',
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Token expirado ou inválido',
      });
    }

    req.user = decoded;
    next();
  });
};

module.exports = hasToken;
