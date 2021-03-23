const jwt = require('jsonwebtoken');

const { decodeToken } = require('../services/createToken');

// Secret usado pra gerar o token
const segredo = 'senhadificil';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  try {
    const payload = jwt.verify(token, segredo);
    req.userPayload = payload.userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = {
  verifyToken,
  decodeToken,
};
