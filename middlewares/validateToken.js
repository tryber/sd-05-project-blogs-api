const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const secret = 'magic-is-real';
    const payload = jwt.verify(token, secret);
    req.userPayload = payload.userData;
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateToken;
