const { User } = require('../models');

const userById = async (req) => {
  const { id } = req.params;

  const data = await User.findOne({ where: { id } });

  if (!data) return { err: { stattus: 404, message: 'Usuário não existe' } };

  return data;
};

module.exports = userById;
