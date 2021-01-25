const jwt = require('jsonwebtoken');
const { secret } = require('../auth');
const { sendError } = require('../services');

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json(sendError('Token não encontrado'));
  }

  try {
    jwt.verify(authorization, secret);
  } catch {
    return res.status(401).json(sendError('Token expirado ou inválido'));
  }

  next();
};

module.exports = tokenValidation;
