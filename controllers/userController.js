const service = require('../services/userServices');

const create = async (req, res) => {
  try {
    const dadosBody = req.body;
    // console.log(dadosBody);
    const createdUser = await service.create(dadosBody);
    // console.log(createdUser);
    if (createdUser.error) {
      if (createdUser.code === 'Bad Request') {
        return res.status(400).json({ message: createdUser.message });
      }
      if (createdUser.code === 'Conflict') {
        return res.status(409).json({ message: createdUser.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no create user' });
    }
    res.status(201).json({ token: createdUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no create user' });
  }
};

const login = async (req, res) => {
  try {
    const dadosBody = req.body;
    // console.log(dadosBody);
    const getlogin = await service.login(dadosBody);
    // console.log(login);
    if (getlogin.error) {
      if (getlogin.code === 'Bad Request') {
        return res.status(400).json({ message: getlogin.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no login' });
    }
    res.status(200).json({ token: getlogin });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no LOGIN' });
  }
};
const getAll = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const getUsers = await service.getAll(authorization);
    // console.log(login);
    if (getUsers.error) {
      if (getUsers.code === 'Unauthorized') {
        return res.status(401).json({ message: getUsers.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no getAll' });
    }
    res.status(200).json(getUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no GETALL' });
  }
};



module.exports = {
  login,
  getAll,
  // getById,
  create,
  // update,
  // remove,
};
