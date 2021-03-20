const nameValid = (req) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return {
      err: { message: '"displayName" length must be at least 8 characters login', status: 400 },
    };
  }

  if (!displayName) {
    return {
      err: { message: '"displayName" is required', status: 400 },
    };
  }
  return null;
};

module.exports = nameValid;
