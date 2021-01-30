const { Router } = require('express');
const service = require('../services/userServices');
const createJWT = require('../token/createToken');
const validateJWT = require('../token/validateToken');
const emailSword = require('../middlewares/emailSword');
const checkUser = require('../middlewares/checkUser');

const route = Router();

route.post('/', emailSword, checkUser, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await service.create(displayName, email, password, image);
    if (newUser.error) {
      return res.status(newUser.code).json({ message: newUser.message });
    }
    const { password: _, ...userData } = newUser.dataValues;
    const token = createJWT(userData);
    return res.status(201).json({ token });
  } catch (error) {
    return res.send(error.message);
  }
});

route.get('/', validateJWT, async (req, res) => {
  try {
    const users = await service.getAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.send(err.message);
  }
});

route.get('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const userById = await service.getById(id);
  if (userById.error) {
    return res.status(userById.code).json({ message: userById.message });
  }
  return res.status(200).json(userById);
});

route.delete('/me', validateJWT, async (req, res, next) => {
  const { id } = req.payload;
  try {
    const user = await service.deleteUser(id);
    res.status(204).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = route;
