const errorMiddleware = async (err, _req, res, _next) => {
  const [message, status] = err.message.split('|');
  res.status(status || 500).json({ message });
};

module.exports = errorMiddleware;
