const services = require('../services');

const { tokenJWT } = require('../services');

const login = async (req, res) => {
  try {
    const profile = await services.users.login(req.body);
    const token = await tokenJWT(profile.dataValues);
    res.status(200).json({ token });
  } catch (err) {
    if (err.code === 'invalid_data') return res.status(400).json({ message: err.message });
    console.error(err.message);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { login };
