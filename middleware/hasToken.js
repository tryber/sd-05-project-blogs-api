const { verifyToken } = require('./createToken');

const hasToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    console.log('token', token);
    const payload = await verifyToken(token);
    req.payload = payload;
  } catch (error) {
    console.error('DEU RUIM', error);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  return next();
};
module.exports = hasToken;
