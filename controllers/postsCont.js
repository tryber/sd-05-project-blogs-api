const express = require('express');
const rescue = require('express-rescue');
const auth = require('../middlewares/auth');
const service = require('../services/postsService');

const router = express.Router();

router.post('/', auth, rescue(async (req, res, next) => {
  const { id } = req.user;
  try {
    const post = await service.create(req.body, id);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}));

router.put('/:id', auth, rescue(async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await service.update(id, req.user.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}));

// router.delete('/:id', auth, rescue(async (req, res, next) => {
//   const { id } = req.user;
//   try {
//     const user = await service.exclude(id);
//     console.log(user);
//     res.status(204).json(user);
//   } catch (err) {
//     next(err);
//   }
// }));

router.get('/:id', auth, rescue(async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await service.getOne(id);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}));

router.get('/', auth, rescue(async (req, res, next) => {
  try {
    const posts = await service.getAll();
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
}));

module.exports = router;
