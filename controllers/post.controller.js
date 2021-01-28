const { Router } = require('express');
const service = require('../services/post.service');

const postRouter = Router();
const GET_SUCCESS = 200;
// const DELETE_SUCCESS = 204;
const POST_SUCESS = 201;

postRouter.post('/', service.registerPost, (req, res) => {
  res.status(POST_SUCESS).json(req.data);
});

postRouter.get('/', service.getAllPosts, (req, res) => {
  res.status(GET_SUCCESS).json(req.data);
});

postRouter.get('/:id', service.getPost, (req, res) => {
  res.status(GET_SUCCESS).json(req.data);
});

module.exports = postRouter;
