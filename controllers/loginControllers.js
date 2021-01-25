const { User } = require('../models');
const createToken = require('../auth/createToken');
const { sendError } = require('../services');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ where: { email } });

    if (result?.password === password) {
      const { password: _, ...userData } = result;
      const token = createToken(userData);
      return res.status(200).json({ token });
    }

    return res.status(400).json(sendError('Campos inválidos'));
  } catch (err) {
    console.log(err);
    return res.status(500).json(sendError('Ops... algo deu errado, né?'));
  }
};

module.exports = {
  login,
};
