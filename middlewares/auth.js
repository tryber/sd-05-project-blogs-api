const jwt = require('./jwt');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined || authorization === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const payload = jwt.verifyToken(authorization);
    req.payload = payload;
  } catch (error) {
    console.log('aaaaa', error);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  return next();
};
