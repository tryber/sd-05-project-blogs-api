const { verifyToken } = require('../functions/tokenOp');

function MiddleToken(req, _res, next) {
  const { authorization } = req.headers;
  const err = {
    message: 'Token não encontrado',
    status: 401,
  };
  if (authorization === undefined) {
    return next(err);
  }
  err.message = 'Token não encontrado';
  if (authorization === '') {
    return next(err);
  }
  err.message = 'Token expirado ou inválido';
  try {
    const payload = verifyToken(authorization);
    req.payload = payload;
    return next();
  } catch (error) {
    err.token = 'error no token';
    return next(err);
  }
}

module.exports = MiddleToken;
