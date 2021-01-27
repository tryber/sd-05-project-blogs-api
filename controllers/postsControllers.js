const service = require('../services/postsServices');

const create = async (req, res) => {
  try {
    const { title, content} = req.body;
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

module.exports = {
  // login,
  // getAll,
  // getById,
  create,
  // update,
  // remove,
};
