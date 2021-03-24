const jwt = require('jsonwebtoken');
const checkEmail = require('../helpers/utils');

const segredo = 'token';

const authorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, segredo);
    const user = await checkEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = authorization;
