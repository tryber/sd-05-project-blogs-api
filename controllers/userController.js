const { Router } = require('express');

const Joi = require('joi');

const { Users } = require('../models');
const tokenValidation = require('../middleWare/tokenValidation');
const errorHandler = require('../middleWare/errorHandler');
const createToken = require('../services/createToken');

const userRouter = Router();

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
  image: Joi.string(),
});

/* Como ensinado pela nat, o errorHandler verifica o schema do Joi e retorna as mensagens
 de erro conforme especificado */
userRouter.post('/', errorHandler(schema), async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const userExists = await Users.findOne({ where: { email } });

    if (userExists) return res.status(409).json({ message: 'Usuário já existe' });

    const newUser = await Users.create({
      displayName,
      email,
      password,
      image,
    });
    const token = createToken(newUser.dataValues);
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

userRouter.get('/', tokenValidation, async (req, res) => {
  try {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

userRouter.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({
      where: { id },
      // include: 'posts',
    });
    if (!user) return res.status(404).json({ message: 'Usuário não existe' });
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Deu Ruim' });
  }
});

userRouter.delete('/me', tokenValidation, async (req, res) => {
  const { id } = req.payload;
  try {
    console.log(req.payload, 'NANAT PEDIU, SID IMPLOROU');
    await Users.destroy({ where: { id } });

    return res.status(204).json({ message: 'Deletado com sucesso!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'deu ruim' });
  }
});

userRouter.put('/:id', errorHandler(schema), tokenValidation, async (req, res) => {
  const { id } = req.params;
  const { displayName, email, password, image } = req.body;
  try {
    const updateUser = await Users.findOne({ where: { id } });

    updateUser.displayName = displayName;
    updateUser.email = email;
    updateUser.password = password;
    updateUser.image = image;

    await updateUser.save();

    console.log(updateUser);
    return res.status(201).json(updateUser);
  } catch (error) {
    return res.status(400).json({ message: 'deu ruim' });
  }
});

module.exports = userRouter;
