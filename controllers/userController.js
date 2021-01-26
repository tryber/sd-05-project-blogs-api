const express = require('express');
// const service = require('../Service/userService');
const { Users } = require('../models');
const router = express.Router();

const { createToken } = require('../middlewares/JWToken');

const validateEmail = (email) => {
  const regexEmail = RegExp(/\S+@\S+\.\S+/, 'i');
  return regexEmail.test(email);
};

router.post('/user', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    if (!/^[A-Za-z \s]{8,}$/.test(displayName)) {
      return res.status(400).json({
        message: '"displayName" length must be at least 8 characters long',
      });
    }

    if (!email) {
      return res.status(400).json({
        message: '"email" is required',
      });
    }

    if (!validateEmail) {
      return res.status(400).json({
        message: '"email" must be a valid email',
      });
    }
    if (!password) {
      return res.status(400).json({
        message: '"password" is required',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: '"password" length must be 6 characters long'});
    }
    const exists = await Users.findOne({ where: {email} });
    if (exists.length > 0) {
      return res.status(409).json({ message: 'Usuário já existe'});
    }
    const newUser = await Users.create(displayName, email, password, image);
    if (newUser.error) {
      return res.status(newUser.statusCode).json({ message: newUser.message });
    }
    console.log('User Token', {
      id: newUser.insertId,
      displayName,
      email,
      image,

    });
    const token = createToken({
      id: newUser.insertId,
      displayName,
      email,
      image,
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo deu errado no create new user'});
  }
});

module.exports = router;
