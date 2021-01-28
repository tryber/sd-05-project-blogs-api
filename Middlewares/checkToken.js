const { verifyToken } = require('./webTokenCreate');

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    console.log('authorization', authorization);
    const payload = await verifyToken(authorization);
    req.payload = payload;
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = checkToken;
