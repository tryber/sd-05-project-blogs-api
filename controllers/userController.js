const { Router } = require('express');
const service = require('../services/userServices');
const createJWT = require('../token/createToken');
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
    const { password: _, ...userData } = newUser;
    const token = createJWT(userData);
    return res.status(201).json({ token });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = route;
