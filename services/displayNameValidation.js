const displayNameValidation = (req) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return { err: { message: '"displayName" length must be at least 8 characters long', status: 400 } };
  }

  return null;
};

module.exports = displayNameValidation;
