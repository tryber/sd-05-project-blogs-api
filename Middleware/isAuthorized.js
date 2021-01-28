const { authenticateToken } = require('../Service/UserServices');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const payloadUser = authenticateToken(authorization);

    req.data = payloadUser;
    next();
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
};
