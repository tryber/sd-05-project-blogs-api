const services = require('../services');

const create = async (req, res) => {
  try {
    console.log(`id no controller: ${req.userPayload.id}`);
    const newPost = await services.posts.create(req.body, req.userPayload);
    res.status(201).json(newPost);
  } catch (err) {
    if (err.code === 'invalid_entries') return res.status(400).json({ message: err.message });
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { create };
