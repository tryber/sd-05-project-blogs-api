const express = require('express');
const { generateToken } = require('../utils/generateToken');
const usersService = require('../services/usersService');
const validateToken = require('../utils/validateToken');

const usersRouter = express.Router();

usersRouter.post('/user', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createUser = await usersService.createUser(displayName, email, password, image);

    if (createUser.error) {
      return res.status(createUser.statusCode).json({ message: createUser.message });
    }

    const token = await generateToken(createUser.dataValues);

    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await usersService.login(email, password);

    if (findUser.error) {
      return res.status(findUser.statusCode).json({ message: findUser.message });
    }

    const token = await generateToken(findUser.dataValues);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

usersRouter.get('/user/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const getOneUser = await usersService.getOneUser(id);

    if (getOneUser.error) {
      return res.status(getOneUser.statusCode).json({ message: getOneUser.message });
    }

    return res.status(200).json(getOneUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

usersRouter.get('/user', validateToken, async (req, res) => {
  try {
    const getAllUsers = await usersService.getAllUsers();

    return res.status(200).json(getAllUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

module.exports = usersRouter;
