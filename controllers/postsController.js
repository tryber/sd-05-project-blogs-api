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
    console.log(showPosts);
    res.status(200).json(showPosts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { create, getAll };
