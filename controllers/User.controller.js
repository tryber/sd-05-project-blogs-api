const { createUser, getUsers, getUserById, removeMe } = require('../services/User.services');
const { validateToken } = require('../middlewares/AuthMiddlewares');

module.exports = {
  createUser: async (req, res, _next) => {
    const { displayName, email, password, image } = req.body;
    try {
      const newUser = await createUser(displayName, email, password, image);
      return res.status(201).json({ newUser });
    } catch (error) {
      return res.status(400).json({ message: 'Deu ruim', error });
    }
  },
  getUser: async (_req, res, _next) => {
    try {
      const users = await getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: 'deu ruim' });
    }
  },
  getUserById: async (req, res, _next) => {
    const { id } = req.params;
    return getUserById(id)
      .then((user) => res.status(200).json(user));
  },
  removeMe: async (req, res, _next) => {
    const token = req.headers.authorization;
    const { dataValues: { email } } = await validateToken(token);
    await removeMe(email);
    return res.status(204).send();
  },
};
