const { Router } = require('express');
// const { createToken } = require('../midllewares/jwt');
const { verifyName, verifyEmail, verifyPassword, verifyEmailExist } = require('../midllewares/validation');
const { User } = require('../models');

const userRouter = Router();

userRouter.post('/',async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
  await verifyName(displayName);
  await verifyEmail(email);
  await verifyPassword(password);
  await verifyEmailExist(email);
  user = await User.create({ displayName, email, password, image });
  res.status(201).json(user);
} catch (err) {
  // console.log(error);
  res.status(err.status).json({message: err.message});
}
});

userRouter.post('/', async (req, res) => {
  try {
    const {displayName, password} = req.body;
    user = await User.findOne({where: {displayName, password}});
    if (!user) {
      res.status(400).json({message: "Usuário não existe"})
    }
    token = createToken(req.body);
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({message: "Deu ruim"});
  }
})

module.exports = userRouter;