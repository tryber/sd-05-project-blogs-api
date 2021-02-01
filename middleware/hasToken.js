const jwt = require('jsonwebtoken');

const hasToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: 'Token não encontrado',
    });
  }

  jwt.verify(token, process.env.Secret || 'thisIsMySecret', (err, code) => {
    if (err) {
      return res.status(401).json({
        message: 'Token expirado ou inválido',
      });
    }

    req.user = code;
  });

  next();
};

module.exports = hasToken;
