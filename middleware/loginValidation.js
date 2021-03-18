const { Users } = require('../models');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  return next();
};

const validateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email, password } });
    if (!user) return res.status(400).json({ message: 'Campos inválidos' });
    req.user = user.dataValues;
  } catch (err) {
    res.status(500).json({ message: 'Erro no catch' });
  }
  return next();
};

module.exports = { validateEmail, validatePassword, validateUser };
