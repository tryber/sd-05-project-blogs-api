const { verifyToken } = require('../functions/tokenOp');

function MiddleToken(req, _res, next) {
  const { Authorization } = req.headers;
  const err = {
    message: 'Token não encontrado',
    status: 401,
  };
  if (Authorization === undefined) {
    return next(err);
  }
  err.message = 'Token expirado ou inválido';
  try {
    const payload = verifyToken(Authorization);
    req.payload = payload;
    next();
  } catch (error) {
    next(err);
  }
}

module.exports = MiddleToken;
