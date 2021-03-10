const erroMiddleware = (err, _req, res, _next) => {
  if (err.code === 'invalid_data') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 'conflict') {
    return res.status(409).json({ message: err.message });
  }
};

module.exports = erroMiddleware;
