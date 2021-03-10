const { InvalidData } = require('../../utils/errors');

const validateName = async (req, _res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) next(
      new InvalidData('"displayName" length must be at least 8 characters long'));

  next();
};

module.exports = validateName;
