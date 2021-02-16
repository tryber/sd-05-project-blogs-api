const express = require('express');
const {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
} = require('../middlewares/UserMiddlwares');
const UserController = require('../controllers/User.controller');

const router = express.Router();

router.post(
  '/',
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  UserController.createUser,
);

module.exports = router;
