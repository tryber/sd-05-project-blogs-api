const { Router } = require('express');
const { userServices } = require('../services');

const user = Router();

user.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const token = await userServices.registerUser(
      displayName,
      email,
      password,
      image,
    );

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
});

module.exports = user;
