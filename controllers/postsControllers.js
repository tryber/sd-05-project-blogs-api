const service = require('../services/postsServices');

const create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const createPost = await service.create(authorization, title, content);
    // console.log(createPost);
    if (createPost.error) {
      if (createPost.code === 'Bad Request') {
        return res.status(400).json({ message: createPost.message });
      }
      if (createPost.code === 'Unauthorized') {
        return res.status(401).json({ message: createPost.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no create Post' });
    }
    res.status(201).json(createPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu errado no create POST' });
  }
};

const getAll = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const getPosts = await service.getAll(authorization);
    // console.log(login);
    if (getPosts.error) {
      if (getPosts.code === 'Unauthorized') {
        return res.status(401).json({ message: getPosts.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no getAll' });
    }
    res.status(200).json(getPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no GETALL' });
  }
};

const getById = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const getPostbyId = await service.getById(authorization, id);
    if (getPostbyId.error) {
      if (getPostbyId.code === 'Unauthorized') {
        return res.status(401).json({ message: getPostbyId.message });
      }
      if (getPostbyId.code === 'Not Found') {
        return res.status(404).json({ message: getPostbyId.message });
      }
      return res.status(500).json({ message: 'Algo deu ruim no getById' });
    }
    res.status(200).json(getPostbyId);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Algo deu ruim no GETBYID' });
  }
};

module.exports = {
  // login,
  getAll,
  getById,
  create,
  // update,
  // remove,
};
