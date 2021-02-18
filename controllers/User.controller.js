const { createUser, getUsers } = require('../services/User.services');

module.exports = {
  createUser: async (req, res, _next) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await createUser(displayName, email, password, image);
    res.status(201).json({ newUser });
  },
  getUser: async (_req, res, _next) => {
    const users = await getUsers();
    res.status(200).json(users);
  },
};
