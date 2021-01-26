const customReturn = (res, message, status) => res.status(status).json({ message });

const validateLoginInformation = (req, res, next) => {
  const { email, password } = req.body;
  const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  if (email === undefined) {
    return customReturn(res, '"email" is required', 400);
  }
  if (email.length === 0) {
    return customReturn(res, '"email" is not allowed to be empty', 400);
  }
  if (!regEx.test(email)) {
    return customReturn(res, '"email" must be a valid email', 400);
  }
  if (password === undefined) {
    return customReturn(res, '"password" is required', 400);
  }
  if (password.length === 0) {
    return customReturn(res, '"password" is not allowed to be empty', 400);
  }
  next();
};

module.exports = validateLoginInformation;
