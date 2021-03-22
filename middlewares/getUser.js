const { User } = require('../models');

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const data = await User.findOne({ where: { id } });
  if (!data) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  req.userData = data;

  next();
};

module.exports = getUserById;
