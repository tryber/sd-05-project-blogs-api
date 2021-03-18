const jwt = require('jsonwebtoken');

const { SECRET } = require('../helper/token');

const verifyJWT = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const decoded = jwt.verify(token, SECRET);
    const { email, id } = decoded;
    req.user = { email, id };
    console.log('AQUI NO AUTH, L12', req.user);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = { verifyJWT };
