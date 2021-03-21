const jwt = require('jsonwebtoken');

const tokenMiddleware = async (req, res, next) => {
  try {
    const secret = 'secretPassword';
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    }

    const payload = jwt.verify(token, secret);
    req.payload = payload;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = tokenMiddleware;
