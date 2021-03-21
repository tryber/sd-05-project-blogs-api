module.exports = (err, _req, res, _next) => {

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
