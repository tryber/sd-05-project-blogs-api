const { validToken } = require('./authentication');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return { err: { message: 'Token não encontrado', status: 401 } };
    }

    const verification = validToken(authorization);
    req.user = verification.newUser;

    next();
  } catch {
    return res.status(401).send({ message: 'Token expirado ou inválido' });
  }
};

module.exports = auth;
