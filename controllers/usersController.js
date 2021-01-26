const services = require('../services');

const create = async (req, res) => {
  try {
    const newUser = await services.users.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 'invalid_data')
    return res.status(400).json({ message: err.message });
  }
  // console.error(err.message)
  res.status(500).json('Something went wrong')
}

module.exports = { create }

// User.findOne({
//   where: {
//   [Op.and]: [
//   { email: email.toLowerCase() },
//   { password },
//   ],
//   }, 