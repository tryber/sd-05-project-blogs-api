const express = require('express');
const rescue = require('express-rescue');
const service = require('../services/userService');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', rescue(async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}));

router.get('/:id', auth, rescue(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await service.getOne(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}));

router.get('/', auth, rescue(async (req, res, next) => {
  try {
    const users = await service.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}));

module.exports = router;
