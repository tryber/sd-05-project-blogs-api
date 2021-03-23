module.exports = (req, res, next) => {
  const { content, title } = req.body;
  let message = '';
  if (!content) {
    message = '"content" is required';
    return res.status(400).json({ message });
  }
  if (!title) {
    message = '"title" is required';
    return res.status(400).json({ message });
  }
  return next();
};
