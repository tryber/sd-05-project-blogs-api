const validEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const userValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({
        message: '"displayName" length must be at least 8 characters long',
      });
  }
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  const testEmail = validEmail.test(email);
  if (!testEmail) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }
  next();
};

module.exports = { userValidation };
