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
    try {
      const formData = req.body;
      const user = await Users.create(formData);
      console.log('controller L25:', user.dataValues);
      if (user.message) return res.status(400).json('Algo deu errado!');
      const { id, email } = user.dataValues;
      const token = createToken({ id, email });
      console.log('userController L28', token);
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json('Algo deu errado NO CATCH');
    }
  },
);

router.get('/',
  verifyJWT,
  async (_req, res) => {
    try {
      const allUsers = await Users.findAll();
      if (!allUsers) return res.status(401).json({ message: 'No users on database.' });
      return res.status(200).json(allUsers);
    } catch (err) {
      return res.status(401).json({ message: 'Erro no catch.' });
    }
  });

router.get('/:id',
  verifyJWT,
  async (req, res) => {
    try {
      const user = await Users.findOne({ where: { id: req.params.id } });
      if (!user) return res.status(401).json({ message: 'Usuário não existe' });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(401).json({ message: 'Erro no catch' });
    }
  });

router.delete('/me',
  verifyJWT,
  async (req, res) => {
    try {
      const { email } = req.payload;
      console.log('userController L66', req.payload);
      const selectUser = await Users.findOne({ where: { email } });
      console.log('log L 68', selectUser);
      if (!selectUser) return res.status(404).json({ message: 'You cant do that dude!' });
      await selectUser.destroy();
      return res.status(204).json({ message: 'Usuário deletado.' });
    } catch (err) {
      return res.status(204).json({ message: 'Erro no catch' });
    }
  });

module.exports = router;
