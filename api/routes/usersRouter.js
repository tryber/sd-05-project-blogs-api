const rescue = require('express-rescue');
const { Router } = require('express');
const { cadastro, login } = require('../middlewares');
const UserController = require('../controllers/UserController');

const route = Router();

route.post('/user', cadastro, rescue(UserController.cadastraUsuario));
route.post('/login', login, rescue(UserController.efetuaLogin));

module.exports = route;
