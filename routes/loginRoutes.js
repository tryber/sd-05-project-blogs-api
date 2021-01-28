const express = require('express');
const { loginController } = require('../controllers');
const { loginValidation } = require('../middlewares');

const loginRoutes = express.Router();

loginRoutes.post('/', loginValidation, loginController.login);

module.exports = loginRoutes;
