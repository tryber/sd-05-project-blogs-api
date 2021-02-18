const express = require('express');
const {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyUserExists,
} = require('../middlewares/UserMiddlewares');
const AuthMid = require('../middlewares/AuthMiddlewares');
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

router.get('/', AuthMid.tokenIsValid, UserController.getUser);

module.exports = router;
