const jwt = require('jsonwebtoken');

const secret = 'shhhh...é segredo';

function MiddleToken(req, _res, next) {
  const { authorization } = req.headers;
  const err = {
    message: 'Token não encontrado|401',
  };
  if (authorization === undefined) {
    return next(err);
  }
  if (authorization === '') {
    return next(err);
  }
  err.message = 'Token expirado ou inválido|401';
  try {
    const verifyToken = (token) => jwt.verify(token, secret);
    const payload = verifyToken(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    err.token = 'error no token|401';
    return next(err);
  }
}

module.exports = MiddleToken;
