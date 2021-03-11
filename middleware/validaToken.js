const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    const SECRET = process.env.SECRET || 'seicho-no-ie';
    const payload = jwt.verify(token, SECRET);
    req.userPayload = payload.userData;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
