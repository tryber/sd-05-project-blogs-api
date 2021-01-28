module.exports = (err, _req, res, _next) => {
  console.error(err);
  const [errorData] = err.errors;
  const { message, validatorKey } = errorData;

  if (validatorKey === 'len') {
    res.status(400).json({ message });
  }
  if (validatorKey === 'isEmail') {
    res.status(400).json({ message });
  }
  if (validatorKey === 'not_unique') {
    res.status(409).json({ message: 'Usuário já existe' });
  }
  if (validatorKey === 'is_required') {
    res.status(400).json({ message });
  }
  if (validatorKey === 'not_found') {
    res.status(404).json({ message });
  }
  if (validatorKey === 'unauthorized') {
    res.status(401).json({ message });
  }
  res.status(404).json({ message: 'Algo deu errado' });
};
