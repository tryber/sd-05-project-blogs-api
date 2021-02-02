const { Users } = require('../models');
const { createToken } = require('./createToken');

const isAuthenticate = async (req, res, next) => {
  const { email, password } = req.body;

  const userInfo = await Users.findOne({ where: { email, password } });

  if (!userInfo) {
    return res.status(400).json({
      message: 'Campos inválidos',
    });
  }

  const token = createToken(userInfo.dataValues);

  req.headers.authorization = token;

  console.log('REQ TOKEN', token);

  next();
};

module.exports = isAuthenticate;
