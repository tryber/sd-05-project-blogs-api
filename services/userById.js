const { User } = require('../models');

const userById = async (req, res) => {
  const { id } = req.params;

  const data = await User.findOne({ where: { id } });

  if (!data) return res.status(404).json({ message: 'Usuário não existe' });

  return data;
};

module.exports = userById;
