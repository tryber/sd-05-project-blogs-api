const isNewUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!regEx.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = isNewUser;
