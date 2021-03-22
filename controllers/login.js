const { Router } = require('express');
const { createToken } = require('../midllewares/jwt');
const { verifyEmail, verifyPassword } = require('../midllewares/validation');
const { User } = require('../models');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const {email, password} = req.body;
  try {
    verifyEmail(email);
    verifyPassword(password);
    const user = await User.findOne({ where: {email, password} })
    if (!user) {
      res.status(400).json({message: "Campos inválidos"});
    }
    console.log(user.dataValues)
    token = createToken(user.dataValues);
    res.status(200).json(token);
  } catch (err) {
    res.status(err.status).json({message: err.message});
  }
})

module.exports = loginRouter;