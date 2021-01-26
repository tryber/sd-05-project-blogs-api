const { Router } = require('express');
const service = require('../services/userService');
const createJWT = require('../auth/createJWT');
const userInfo = require('../middleware/userInfo');
const checkUser = require('../middleware/checkUser');

const users = Router();

users.post('/', userInfo, checkUser, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await service.create(displayName, email, password, image);
    if (newUser.error) {
      return res.status(newUser.code).json({ message: newUser.message });
    }
    const { password: _, ...userData } = newUser;
    const token = createJWT(userData);
    return res.status(201).json({ token });
  } catch (e) {
    res.send(e.message);
  }
});
// const getAll = async (req, res) => {
//   return res.status(200).json({ message: 'Deu bom!' });
// };
// users.get('/', getAll);
module.exports = users;
