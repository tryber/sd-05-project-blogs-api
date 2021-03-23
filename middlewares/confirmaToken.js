const { validaToken } = require('./auth');

const confirmaToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    console.log('authorization', authorization);
    const payload = await validaToken(authorization);
    req.payload = payload;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = confirmaToken;
