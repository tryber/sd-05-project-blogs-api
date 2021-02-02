const { decodeToken } = require('../auth/token');

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined || authorization === '') {
    return res.status(401).json({ message: 'Token não encontrado' }); 
  };

  try {
    const payload = decodeToken(authorization);

    req.payload = payload;

    return next();
  } catch (e) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  };
};

module.exports = verifyToken;
