const customReturn = (res, message, status) => res.status(status).json({ message });

const validateNewUserInformation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  if (displayName.length < 8) {
    return customReturn(res, '"displayName" length must be at least 8 characters long', 400);
  }
  if (!email) {
    return customReturn(res, '"email" is required', 400);
  }
  if (!regEx.test(email)) {
    return customReturn(res, '"email" must be a valid email', 400);
  }

  if (!password) {
    return customReturn(res, '"password" is required', 400);
  }
  if (password.length < 6) {
    return customReturn(res, '"password" length must be 6 characters long', 400);
  }

  next();
};

module.exports = validateNewUserInformation;
