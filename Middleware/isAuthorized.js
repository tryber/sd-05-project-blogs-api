const { isAValidToken } = require('../Service/UserServices');

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers.authorization;

    if (isAValidToken(token)) next();

  } catch (error) {
    const { message, status } = error;

    next({ message, status });
  }
};
