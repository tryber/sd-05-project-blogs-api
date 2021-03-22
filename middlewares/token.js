const { validToken } = require('./authentication');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      console.log('token nao encontrado', req.headers);
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    const verification = validToken(authorization);
    // console.log('aqui token', verification);
    req.user = verification;

    next();
  } catch {
    console.log('token expirado', req.headers);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = auth;
