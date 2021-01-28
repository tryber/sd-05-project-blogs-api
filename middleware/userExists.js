const { Users } = require('../models');

const userExist = async (req, res, next) => {
  const { email } = req.body;

  const usuario = await Users.findOne({ where: { email } });
  if (usuario) {
    return res.status(409).json({
      message: 'Usuário já existe',
    });
  }
  next();
};

module.exports = userExist;
