const { verifyToken } = require('../auth');
const { sendError } = require('../services');

const tokenValidation = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json(sendError('Token não encontrado'));
    }

    const verifiedToken = verifyToken(authorization);

    req.user = verifiedToken.dataValues;

    next();
  } catch {
    return res.status(401).json(sendError('Token expirado ou inválido'));
  }
};

module.exports = tokenValidation;
