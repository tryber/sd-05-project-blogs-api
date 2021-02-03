const { decodeToken } = require('../auth/token');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (token === undefined || token === '') {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  try {
    const payload = decodeToken(token);
    req.payload = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = verifyToken;
