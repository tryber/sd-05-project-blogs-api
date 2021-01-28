const { verifyToken } = require('../auth/token');

const authToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization, 'authorization');

    if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });

    const checkToken = verifyToken(authorization);

    console.log(checkToken, 'checktoken');
    req.user = checkToken.user;

    next();
  } catch {
    return res.status(401).send({ message: 'Token expirado ou inválido' });
  }
};

module.exports = authToken;
