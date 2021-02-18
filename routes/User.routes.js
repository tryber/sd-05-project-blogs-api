const express = require('express');
const {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyUserExists,
  verifyIdNotExists,
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

router.get('/', AuthMid.tokenNotExists, AuthMid.tokenIsValid, UserController.getUser);
router.get(
  '/:id',
  AuthMid.tokenNotExists,
  AuthMid.tokenIsValid,
  verifyIdNotExists,
  UserController.getUserById,
);

module.exports = router;
