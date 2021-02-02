const jwt = require('jsonwebtoken');

const funAuthorization = (async (req, res, next) => {
  const verifyToken = async (token) => {
    const secret = 'segredo';
    const payload = jwt.verify(token, secret);
    return payload;
  };
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = await verifyToken(auth);
    req.payload = payload;
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  return next();
});

module.exports = funAuthorization;
