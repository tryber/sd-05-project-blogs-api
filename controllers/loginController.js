const { Router } = require('express');
const Joi = require('joi');

const { Users } = require('../models');
const errorHandler = require('../middleWare/errorHandler');
const createToken = require('../services/createToken');

const loginRouter = Router();

const schema = Joi.object({
  email: Joi.string().required().not().empty(),
  password: Joi.string().required().not().empty(),
});

loginRouter.post('/', errorHandler(schema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const login = await Users.findOne({ where: { email, password } });
    if (!login) return res.status(400).json({ message: 'Campos inválidos' });
    const token = createToken(login.dataValues);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = loginRouter;
