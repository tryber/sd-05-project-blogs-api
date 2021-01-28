const { Posts, Users } = require('../models');

const postById = async (req, res, next) => {
  const { id } = req.params;

  const data = await Posts.findOne({
    where: { id },
    include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
  });

  if (!data) return res.status(404).send({ message: 'Post não existe' });

  req.postData = data;

  next();
};

module.exports = postById;
