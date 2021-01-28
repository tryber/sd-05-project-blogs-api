const jwt = require('jsonwebtoken');
// const model = require('../model/usersModel');

const secret = 'thebeatlesÉsuperestimado';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    jwt.verify(token, secret);
    const decoded = jwt.verify(token, secret);
    const { data: { id } } = decoded;
    req.tokenId = id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
