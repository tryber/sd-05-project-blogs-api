const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const secret = 'segredo';
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token não encontrado' });

    const decodedPayload = jwt.verify(token, secret);
    req.userData = decodedPayload;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
