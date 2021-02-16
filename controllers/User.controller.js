const { createUser } = require('../services/User.services');

module.exports = {
  createUser: async (req, res, _next) => {
    const { displayName, email, password, image } = req.body;
    const newUser = await createUser(displayName, email, password, image);
    res.status(201).json({ newUser });
  },
};
