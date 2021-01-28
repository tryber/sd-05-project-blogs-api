const jwt = require('jsonwebtoken');

const secret = 'backEndInfluencer';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    req.userPayload = payload;
    return next();
  } catch (err) {
    if (err.message === 'jwt malformed') {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    console.log(err.message);
    res.status(401).json({ message: 'Token não encontrado' });
  }
};

module.exports = { auth };
