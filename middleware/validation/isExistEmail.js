const { User } = require('../../models/');
const { Conflict } = require('../../utils/errors');

const validaEmailExiste = async (req, _res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) next(new Conflict('Usuário já existe'));

  next();
};

module.exports = validaEmailExiste;
