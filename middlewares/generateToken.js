const jwt = require('jsonwebtoken');
require('dotenv/config');
const { User } = require('../models');

// secret in dotenv for best practice
// const secret = 'FotoLogNãoMorreu';

const headers = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign({ data: payload }, process.env.SECRET, headers);
  return token;
};

const authorizationToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res.status(401).json({ message: 'Expired token or invalid token' });
    }
    const { password, ...userDate } = user;
    req.user = userDate;
    return next();
  } catch (_err) {
    return res.status(401).json({ message: 'Expired token or invalid token' });
  }
};

module.exports = { createToken, authorizationToken };
