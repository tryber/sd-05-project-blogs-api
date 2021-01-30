module.exports = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (email && !email.match(regex)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (displayName && displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (password && password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  return next();
};
