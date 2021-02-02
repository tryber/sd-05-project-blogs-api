const { Users } = require('../models');

const hasEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({
      message: 'Usuário já existe',
    });
  }
  next();
};

module.exports = hasEmail;
