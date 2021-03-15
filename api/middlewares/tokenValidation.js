// const rescue = require('express-rescue');

const jwt = require('jsonwebtoken');
const secretKey = require('../models/secretKey');
const { buscaPorEmail } = require('../controllers/UserController');

const secret = secretKey();
//
module.exports = async (req, res, next) => {
  const { authorization: token } = req.headers;
  console.log('token: ', token);
  try {
    if (!token) {
      console.log('tokenJWT:', token);
      return res.status(401).json({
        message: 'Token não encontrado',
      });
    }
    const decoded = jwt.verify(token, secret);
    const user = await buscaPorEmail(decoded.data.email);
    req.me = user;
    if (!user) {
      return res.status(401).json({
        message: 'Token expirado ou inválido',
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};
