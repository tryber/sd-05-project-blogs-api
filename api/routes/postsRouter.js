const { Router } = require('express');
const posts = require('../controllers/PostController');
const { tokenValidation, postValidation } = require('../validations');

const routes = Router();

routes.get('/post', tokenValidation, posts.buscaTodosPosts);
routes.post('/post', tokenValidation, postValidation, posts.cadastraUmPost);

module.exports = routes;
