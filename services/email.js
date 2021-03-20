const { User } = require('../models/Users');

const emailValid = async (req) => {
  const { email } = req.body;

  if (!email) return { err: { message: '"email" is required', status: 400 } };

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!re.test(email)) return { err: { message: '"email" must be a valid email', status: 400 } };

  const emailExist = await User.findOne({ where: { email } });
  if (emailExist) return { err: { message: 'Usuário já existe', status: 409 } };
  return null;
};

module.exports = emailValid;
