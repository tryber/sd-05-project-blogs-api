const { User } = require('../../models');

class GeneralError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const validaEmailExiste = async (req, _res, next) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) next(new GeneralError('Usuário já existe', 'conflict'));

  next();
};

module.exports = validaEmailExiste;
