const errorHandler = (schema) => (req, res, next) => {
  // Validate ensinado por nat
  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

module.exports = errorHandler;
