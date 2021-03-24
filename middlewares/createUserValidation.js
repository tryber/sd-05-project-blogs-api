const { validateEmail, checkEmail } = require('../helpers/utils');

const createUserValidation = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (await checkEmail(email)) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  return next();
};

module.exports = createUserValidation;
