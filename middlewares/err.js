const createUserValidator = (err, _req, res, _next) => {

  const { message, validatorKey } = err;

  if (validatorKey === 'length') {
    return res.status(400).json({ message });
  }
  if (validatorKey === 'isEmail') {
    return res.status(400).json({ message });
  }
  if (validatorKey === 'emailAlreadyExists') {
    return res.status(409).json({ message });
  }
  if (validatorKey === 'failedRegex') {
    return res.status(400).json({ message });
  }
  if (validatorKey === 'not_unique') {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  if (validatorKey === 'is_required') {
    return res.status(400).json({ message });
  }
  return res.status(500).json({ message: 'Algo deu errado' });
};

const loginValidator = (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.length === 0) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  if (!password && password.length < 1) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  return next();
}

module.exports = { createUserValidator, loginValidator };
