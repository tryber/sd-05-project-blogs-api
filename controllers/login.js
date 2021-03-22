const { Router } = require('express');
const { createToken } = require('../midllewares/jwt');
const { verifyEmail, verifyPassword } = require('../midllewares/validation');
const { User } = require('../models');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    verifyEmail(email);
    verifyPassword(password);
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
    console.log(user.dataValues);
    const token = createToken(user.dataValues);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
});

module.exports = loginRouter;
