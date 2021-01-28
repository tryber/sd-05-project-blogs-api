const { Router } = require('express');
const service = require('../services/userService');
const createJWT = require('../auth/createJWT');
const validateJWT = require('../auth/validateJWT');
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
    const payload = {
      id: newUser.dataValues.id,
      email: newUser.dataValues.email,
      displayName: newUser.dataValues.displayName,
    };
    const token = createJWT(payload);
    return res.status(201).json({ token });
  } catch (e) {
    res.send(e.message);
  }
});

users.get('/', validateJWT, async (req, res) => {
  const allUsers = await service.getAll();
  return res.status(200).json(allUsers);
});

users.get('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const userById = await service.getById(id);
  if (userById.error) {
    return res.status(userById.code).json({ message: userById.message });
  }
  return res.status(200).json(userById);
});

users.delete('/me', validateJWT, async (req, res) => {
  try {
    const { email } = req.payload;
    await service.deleteMe(email);
    return res.status(204).json({ message: 'Usuário apagado' });
  } catch (e) {
    res.send(e.message);
  }
});
// const getAll = async (req, res) => {
//   return res.status(200).json({ message: 'Deu bom!' });
// };
// users.get('/', getAll);
module.exports = users;
