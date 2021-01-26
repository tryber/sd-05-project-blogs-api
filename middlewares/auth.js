const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'calado';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const payload = jwt.verify(token, secret, {
      audience: 'identity',
      issuer: 'post-api',
    });

    const user = await User.findOne({ where: { email: payload.userData.email } });

    if (!user) throw new Error({ code: 'invalid_user', message: 'Invalid entries. Try again.' });

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
