const express = require('express');

const router = express.Router();

const { Users } = require('../models');
const { createToken } = require('../helper/token');
const { verifyJWT } = require('../middleware/authorization');
const {
  validateName,
  validateEmail,
  validatePassword,
  checkUserEmail,
} = require('../middleware/userValidation');

router.post(
  '/',
  validateName,
  validateEmail,
  validatePassword,
  checkUserEmail,
  async (req, res) => {
    const formData = req.body;
    const user = await Users.create(formData);
    console.log('controller:', user.dataValues);
    if (user.message) return res.status(400).json('Algo deu errado!');
    const { id, email } = user.dataValues;
    const token = createToken({ id, email });
    console.log(token);
    res.status(201).json({ token });
  },
);

router.get('/',
  verifyJWT,
  async (_req, res) => {
    const allUsers = await Users.findAll();
    if (!allUsers) return res.status(404).json({ message: 'No user on database.' });
    return res.status(200).json(allUsers);
  });

router.get('/:id',
  verifyJWT,
  async (req, res) => {
    const user = await Users.findOne({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: 'Usuário não existe' });
    return res.status(200).json(user);
  });

router.delete('/me',
  verifyJWT,
  async (req, res) => {
    const { email } = req.payload;
    console.log(req.payload);
    const selectUser = await Users.findOne({ where: { email } });
    await selectUser.destroy();
    return res.status(204);
  });

module.exports = router;
