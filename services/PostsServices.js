// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

const postValidation = (req, res, next) => {
  const { title, content } = req.body;
  if (title === undefined) {
    return res.status(400).json({ message: '"title" is required' });
  }
  if (content === undefined) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

module.exports = { postValidation };
