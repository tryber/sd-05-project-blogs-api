function MiddleErrorUser(err, _req, res, _next) {
  return res.status(err.status).json(err);
}

module.exports = MiddleErrorUser;
