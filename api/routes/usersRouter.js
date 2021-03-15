const rescue = require('express-rescue');
const { Router } = require('express');
const { cadastro, login, tokenValidation } = require('../middlewares');
const UserController = require('../controllers/UserController');

const route = Router();

route.post('/user', cadastro, rescue(UserController.cadastraUsuario));
route.post('/login', login, rescue(UserController.efetuaLogin));
route.get('/user', tokenValidation, rescue(UserController.buscaTodosUsuarios));

module.exports = route;
