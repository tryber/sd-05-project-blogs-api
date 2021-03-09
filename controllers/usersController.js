const { Router } = require('express');
const services = require('../services/usersServices');
const userRouter = Router();

userRouter.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await services.createUser(displayName, email, password, image);

  if (displayName.length < 8) res.status(404).json({ message:  })

  }),
);

module.exports = userRouter;
