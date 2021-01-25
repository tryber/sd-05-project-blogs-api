const { User } = require('../models');
const createToken = require('../auth/createToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ where: { email } });
    if (result?.password === password) {
      const { password: _, ...userData } = result;
      const token = createToken(userData);
      res.status(200).json({ token });
    }
  } catch {
    res.status(500).json({ message: 'Ops... algo deu errado, né?' });
  }
};

module.exports = {
  login,
};
