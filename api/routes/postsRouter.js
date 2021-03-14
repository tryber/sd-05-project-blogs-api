const { Router } = require('express');
const posts = require('../controllers/PostController');
const { tokenValidation } = require('../middlewares');

const routes = Router();

routes.get('/post', tokenValidation, posts.buscaTodosPosts);

module.exports = routes;
