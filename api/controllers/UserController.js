const database = require('../models');

class UserController {
  static async cadastraUsuario(req, res) {
    const novoUsuario = { ...req.body };
    try {
      const user = await database.Users.create(novoUsuario);
      return res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Validation error') {
        return res.status(409).json({ message: 'Usuário já existe' });
      } res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
