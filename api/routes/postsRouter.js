const rescue = require('express-rescue');
const { Router } = require('express');
const posts = require('../controllers/PostController');
const { tokenValidation, postValidation } = require('../validations');
const route = require('./usersRouter');

const routes = Router();

routes.get('/post', tokenValidation, rescue(posts.buscaTodosPosts));
routes.post('/post', tokenValidation, postValidation, rescue(posts.cadastraUmPost));
route.get('/post/:id', tokenValidation, rescue(posts.buscaUmPost));

module.exports = routes;
