const jwt = require('jsonwebtoken');
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

  req.token = jwt.sign({ id: userInfo.id }, process.env.SECRET || 'thisIsMySecret', {
    expiresIn: '1d',
    algorithm: 'HS256',
  });
  next();
};

module.exports = isAuthenticate;
