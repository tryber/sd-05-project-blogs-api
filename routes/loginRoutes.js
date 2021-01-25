const express = require('express');
const { loginControllers } = require('../controllers');
const { loginValidation } = require('../middlewares');

const loginRoutes = express.Router();

loginRoutes.post('/', loginValidation, loginControllers.login);

module.exports = loginRoutes;
