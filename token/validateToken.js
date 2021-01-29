const jwt = require('jsonwebtoken');

const secret = 'localiza';

const validateJWT = (req, res, next) => {
  const JWtoken = req.headers.authorization;
  if (!JWtoken) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const payload = jwt.verify(JWtoken, secret);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateJWT;
