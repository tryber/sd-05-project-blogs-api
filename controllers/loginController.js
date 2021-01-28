const { authentication } = require('../services');
const { sendError } = require('../services');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authentication.login(email, password);

    if (token) {
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
