const { validToken } = require('../middlewares/authentication');

const auth = async (req) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return { err: { message: 'Token não encontrado', status: 401 } };
    }

    const verification = validToken(authorization);
    return verification;
  } catch {
    return { err: { message: 'Token expirado ou inválido', status: 401 } };
  }
};

module.exports = auth;
