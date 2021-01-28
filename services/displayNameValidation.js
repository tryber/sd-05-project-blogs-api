const displayNameValidation = (req) => {
  const { displayName } = req.body;

  if (!displayName) return { err: { message: '"displayName" is required', status: 400 } };

  if (displayName.length < 8) {
    return { err: { message: '"displayName" length must be at least 8 characters long', status: 400 } };
  }

  return null;
};

module.exports = displayNameValidation;
