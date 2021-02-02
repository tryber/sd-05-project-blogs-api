const verifyUser = (schema) => (req, res, next) => {
  const resultado = schema.validate(req.body);

  // console.log(resultado.error.details);

  if (resultado.error) {
    return res.status(400).json({ message: resultado.error.details[0].message });
  }

  next();
};

module.exports = verifyUser;
