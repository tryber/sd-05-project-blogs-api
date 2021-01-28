const jwt = require('jsonwebtoken');
// const model = require('../model/usersModel');

const secret = 'thebeatlesÉsuperestimado';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    // const { data: { email} } = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
