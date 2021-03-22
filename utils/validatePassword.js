const validatePassword = (password) => {
  if (password.length < 6) {
    return false;
  }

  return true;
};

module.exports = validatePassword;
