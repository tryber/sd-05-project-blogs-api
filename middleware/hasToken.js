const { verifyToken } = require('./createToken');

const hasToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = await verifyToken(token);
    req.payload = payload;
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};
module.exports = hasToken;
