const { validToken } = require('./authentication');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const verification = validToken(authorization);
    req.user = verification.newUser;

    next();
  } catch {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = auth;
