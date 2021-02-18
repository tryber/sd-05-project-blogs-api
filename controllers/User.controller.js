const { createUser, getUsers } = require('../services/User.services');

module.exports = {
  createUser: async (req, res, _next) => {
    const { displayName, email, password, image } = req.body;
    try {
      const newUser = await createUser(displayName, email, password, image);
      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(400).json({ message: 'Deu ruim', error });
    }
    // createUser(displayName, email, password, image)
    //   .then((newUser) => {
    //     console.log('meleca');
    //     res.status(201).json({ newUser });
    //   });
  },
  getUser: async (_req, res, _next) => {
    const users = await getUsers();
    return res.status(200).json(users);
  },
};
