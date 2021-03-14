const database = require('../models');
const generateToken = require('../services');

class UserController {
  static async cadastraUsuario(req, res) {
    const novoUsuario = { ...req.body };
    try {
      const user = await database.Users.create(novoUsuario);
      return res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Validation error') {
        return res.status(409).json({ message: 'Usuário já existe' });
      }
      res.status(500).json(error.message);
    }
  }

  static async efetuaLogin(req, res) {
    const { email, password } = req.body;
    console.log('email procurado: ', email);
    try {
      const usuarioLogado = await database.Users.findOne({
        where: {
          email,
        },
      });
      console.log('usuario encontrado: ', usuarioLogado);
      if (usuarioLogado && password === usuarioLogado.password) {
        console.log('senha: ', password, 'senhaencontrada: ', usuarioLogado.password);
        const token = await generateToken(usuarioLogado);
        return res.status(200).json({ token });
      }
      return res.status(400).json({ message: 'Campos inválidos' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
