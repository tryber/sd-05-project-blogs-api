const findEmail = require('../helpers/utils');

const loginValidation = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: 'All fields must be filled' });
    }

    const user = await findEmail(email);

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }

    return next();
  } catch (e) {
    return res.status(500).json({ message: 'Erro', error: e });
  }
};

module.exports = loginValidation;
