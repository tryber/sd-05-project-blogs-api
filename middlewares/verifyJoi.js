const verifyJoi = (schema) => (req, res, next) => {
  // Validate método nativo do Joi
  const validacao = schema.validate(req.body);
  // console.log(validacao.error.details);

  if (validacao.error) {
    return res.status(400).json({ message: validacao.error.details[0].message });
  }
  next();
};

module.exports = verifyJoi;
