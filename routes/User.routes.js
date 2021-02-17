const express = require('express');
const {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyUserExists,
} = require('../middlewares/UserMiddlewares');
const UserController = require('../controllers/User.controller');

const router = express.Router();

router.post(
  '/',
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyUserExists,
  UserController.createUser,
);

module.exports = router;
