const express = require('express');
const rescue = require('express-rescue');
const service = require('../services/userService');

const router = express.Router();

router.post('/', rescue(async (req, res, next) => {
  try {
    const user = await service.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}));

module.exports = router;
