const { isAValidToken } = require('../Service/UserServices');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (isAValidToken(authorization)) next();
  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
};
