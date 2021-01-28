const validateDisplayName = (name) => {
  if (name.length < 8) {
    return false;
  }

  return true;
};

module.exports = validateDisplayName;
