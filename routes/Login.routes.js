const express = require('express');

const { loginUser } = require('../controllers/Login.controller');

const { verifyEmail, verifyPassword, verifyUserNotExists } = require('../middlewares/UserMiddlewares');

const router = express.Router();

router.post('/', verifyEmail, verifyPassword, verifyUserNotExists, loginUser);

module.exports = router;
