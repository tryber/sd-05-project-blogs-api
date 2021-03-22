const { Users } = require('../models');

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const validateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!emailRegex.test(email))
    return res.status(400).json({ message: '"email" must be a valid email' });
  if (password == null) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6 && password.length > 0) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (password.length === 0) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  return next();
};

module.exports = { validateUser };
