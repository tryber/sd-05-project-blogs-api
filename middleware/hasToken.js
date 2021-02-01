const jwt = require('jsonwebtoken');

const hasToken = (req, res, next) => {
  const token = req.headers.Authorization;

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Token não encontrado',
    });
  }

  jwt.verify(token, process.env.Secret, (err, code) => {
    if (err) {
      return res.status(401).json({
        message: 'Token expirado ou invalido',
      });
    }

    req.user = code;
    next();
  });
};

module.exports = hasToken;
