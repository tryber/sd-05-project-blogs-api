const { verifyToken } = require('../auth/token');

const authToken = async (req) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return { err: { status: 401, message: 'Token não encontrado' } };

    const checkToken = verifyToken(authorization);

    return checkToken;
  } catch {
    return { err: { status: 401, message: 'Token expirado ou inválido' } };
  }
};

module.exports = authToken;
