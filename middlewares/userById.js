const { User } = require('../models');

const userById = async (req, res, next) => {
  const { id } = req.params;

  const data = await User.findOne({ where: { id } });

  if (!data) return res.status(404).send({ message: 'Usuário não existe' });

  req.userData = data;

  next();
};

module.exports = userById;
