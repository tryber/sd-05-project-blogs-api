const express = require('express');
const services = require('../services/Users');

const userController = express.Router();

userController.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await services.createUser(
      displayName,
      email,
      password,
      image,
    );
    return res.status(201).json({ token });
  } catch (error) {
    if (error.original) {
      if (error.original.errno === 1062) {
        return res.status(409).json({ message: 'Usuário já existe' });
      }
    }
    if (error.message) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'algo deu ruim' });
  }
});
// GET /users
userController.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const users = await services.findAllUsers(token);
    return res.status(200).json(users);
  } catch (error) {
    if (error.message) {
      if (error.message === 'jwt malformed') {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
      }
      if (error.message === 'qualquer coisa') {
        return res.status(409).json({ message: 'Não encotrado' });
      }
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: 'algo deu ruim' });
  }
});
// GET /user/:id
userController.get('/:id', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const { id } = req.params;
    const user = await services.findUserById(token, id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    if (error.message) {
      if (error.message === 'jwt malformed') {
        return res.status(401).json({ message: 'Token expirado ou inválido' });
      }
      return res.status(401).json({ message: error.message });
    }
    return res.status(500).json({ message: 'algo deu ruim' });
  }
});

// DELETE /user/me
userController.delete('/me', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    console.log(token.split('.')[1]);
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
    );
    console.log(payload.payload.id);
    const { id } = payload.payload;
    console.log(id);
    await services.deleteUser(token, id);
    return res.status(204).json();
  } catch (error) {
    console.error(error);
    if (error.message) {
      return res.status(401).json({ message: 'Token expirado ou inválido' });
    }
    return res.status(500).json({ message: 'algo deu ruim' });
  }
});
// PUT /user:id
// userController.put('/:id', (req, res) => {});

module.exports = userController;
