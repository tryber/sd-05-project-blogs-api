const { Users } = require('../models');

const isAuthenticate = async (req, res, next) => {
  const { email, password } = req.body;
  let { userInfo } = req.body;
  if (!userInfo) {
    userInfo = await Users.findOne({ where: { email, password } });
  }

  if (!userInfo) {
    return res.status(400).json({
      message: 'Campos inválidos',
    });
  }

  next();
};

module.exports = isAuthenticate;
