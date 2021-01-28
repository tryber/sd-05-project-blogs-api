const { Users } = require('../models');

async function validateExistence(req, res, next) {
  const { email } = req.body;

  if (email) {
    const user = await Users.findOne({ where: { email } });

    if (user) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }
  }

  return next();
}

module.exports = validateExistence;
