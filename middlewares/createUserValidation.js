const { validateEmail, checkEmail } = require('../helpers/utils');

const createUserValidation = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!email) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (await checkEmail(email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  return next();
};

module.exports = createUserValidation;
