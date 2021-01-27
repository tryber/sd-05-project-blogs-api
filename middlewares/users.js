const { Users } = require('../models');

const verifyReqExists = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!displayName) {
    return res.status(400).json({ message: '"displayName" is required' });
  }
  next();
};

const verifyReqInfos = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (!email.match(/\S+@\S+\.\S+/)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  const emailFound = await Users.findOne({ where: { email } });

  if (emailFound) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  next();
};

module.exports = {
  verifyReqExists,
  verifyReqInfos,
};
