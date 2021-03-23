const displayNameIsValid = (displayName) => String(displayName).length < 8;

const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = (req, res, next) => {
  const { displayName, email, password } = req.body;
  let message = '';
  if (displayNameIsValid(displayName)) {
    message = '"displayName" length must be at least 8 characters long';
    return res.status(400).json({ message });
  }
  if (!email) {
    message = '"email" is required';
    return res.status(400).json({ message });
  }
  if (!isValidEmail(email)) {
    message = '"email" must be a valid email';
    return res.status(400).json({ message });
  }
  if (!password) {
    message = '"password" is required';
    return res.status(400).json({ message });
  }
  if (String(password).length < 6) {
    message = '"password" length must be 6 characters long';
    return res.status(400).json({ message });
  }
  return next();
};
