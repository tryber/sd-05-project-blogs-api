const { Router } = require('express');

const { User } = require('../models');
// const tokenMiddleware = require('../middlewares/tokenMiddleware')

const usersRouter = Router();

usersRouter.post('/', async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const createUser = await User.create({ displayName, email, password, image })
  
  return res.status(201).json(createUser)

});

module.exports = usersRouter;
