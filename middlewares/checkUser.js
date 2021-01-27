const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const checkUser = await Users.findOne({ where: { email } });
    if (checkUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
  }
  return next();
};
