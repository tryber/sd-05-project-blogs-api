const { Router } = require('express');
const { Users } = require('../models');
const validateUser = require('../middleWare/userValidation');

const userRouter = Router();

userRouter.post('/', validateUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) return res.status(409).json({ message: 'Usuário já existe' });

    const newUser = await Users.create({
      displayName,
      email,
      password,
      image,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Usuário já existe' });
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    return res.status(201).json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'deu ruim' });
  }
});

userRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne({
      where: { id },
      include: 'posts',
    });
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'deu ruim' });
  }
});

userRouter.delete('/', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne({ where: { id } });
    await user.destroy();

    return res.status(201).json({ message: 'Deletado com sucesso!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'deu ruim' });
  }
});

userRouter.post('/', async (req, res) => {
  const id = req.params.id;
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
