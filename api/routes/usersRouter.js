const rescue = require('express-rescue');
const { Router } = require('express');
const { login } = require('../middlewares');
const UserController = require('../controllers/UserController');

const route = Router();

route.post('/user', login, rescue(UserController.cadastraUsuario));

module.exports = route;
