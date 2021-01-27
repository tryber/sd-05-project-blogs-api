const { verifyToken } = require('../auth/token');

const authToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });

    const checkToken = verifyToken(authorization);

    req.user = checkToken.dataValues;

    next();
  } catch {
    return res.status(401).send({ message: 'Token expirado ou inválido' });
  }
};

module.exports = authToken;
