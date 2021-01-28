module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (email !== undefined && email.length === 0) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password !== undefined && password.length < 1) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  return next();
};
