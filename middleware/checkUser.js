const { Users } = require('../models');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const cUser = await Users.findOne({ where: { email } });
    if (cUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
  }
  return next();
};
