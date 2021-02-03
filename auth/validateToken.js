const jwt = require('jsonwebtoken');

const secret = '12345678';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ auth: false, message: 'Token não encontrado' });
  try {
    const payload = jwt.verify(token, secret);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
