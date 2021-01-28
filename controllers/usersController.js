const services = require('../services');

const create = async (req, res) => {
  try {
    const newUser = await services.users.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'invalid_data') return res.status(400).json({ message: err.message });
    if (err.code === 'invalid_entries') return res.status(409).json({ message: err.message });
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAll = async (req, res) => {
  try {
    const showUsers = await services.users.getAll();
    res.status(200).json(showUsers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const getById = async (req, res) => {
  try {
    const getUser = await services.users.getById(req.params);
    res.status(200).json(getUser);
  } catch (err) {
    if (err.code === 'invalid_id') return res.status(404).json({ message: err.message });
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { create, getAll, getById };
