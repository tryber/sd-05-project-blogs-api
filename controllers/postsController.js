const services = require('../services');

const create = async (req, res) => {
  try {
    const newPost = await services.posts.create(req.body, req.userPayload);
    res.status(201).json(newPost);
  } catch (err) {
    if (err.code === 'invalid_entries') return res.status(400).json({ message: err.message });
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAll = async (req, res) => {
  try {
    const showPosts = await services.posts.getAll();
    res.status(200).json(showPosts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getById = async (req, res) => {
  try {
    const getPost = await services.posts.getById(req.params);
    res.status(200).json(getPost);
  } catch (err) {
    if (err.code === 'invalid_entries') return res.status(404).json({ message: err.message });
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const removePost = async (req, res) => {
  try {
    const removedPost = await services.posts.removePost(req.params, req.userPayload);
    res.status(204).json(removedPost);
  } catch (err) {
    if (err.code === 'invalid_entries') return res.status(404).json({ message: err.message });
    if (err.code === 'invalid_data') return res.status(401).json({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, getAll, getById, removePost };
