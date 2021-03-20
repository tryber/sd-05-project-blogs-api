const jwt = require('jsonwebtoken');

const tokenMiddleware = async (req, res, next) => {
  try {
    const secret = 'secretPassword';
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: 'missing auth token',
      });
    }

    const payload = jwt.verify(token, secret);
    req.payload = payload;

    next();
  } catch (error) {
    res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = tokenMiddleware;
