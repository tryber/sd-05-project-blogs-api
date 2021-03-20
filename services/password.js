const passwordValid = (req) => {
  const { password } = req.body;

  if (!password) return { err: { message: '"password" is required', status: 400 } };

  if (password.length < 6) {
    return { err: { message: '"password" length must be 6 characters long', status: 400 } };
  }
  return null;
};

module.exports = passwordValid;
