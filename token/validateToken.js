const token = require('jsonwebtoken');

const secret = 'localizaOPai';

const validateJWT = (req, res, next) => {
  const JWtoken = req.headers.authorization;
  if (!JWtoken) return res.status(410).json({ message: 'No token' });
  try {
    token.verify(JWtoken, secret);
    next();
  } catch (error) {
    return res.status(410).json({ message: error.message });
  }
};

module.exports = validateJWT;
