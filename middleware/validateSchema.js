module.exports = (schema) => (req, res, next) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }

  next();
};
