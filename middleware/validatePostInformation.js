const validatePostInformation = (req, res, next) => {
  const { title, content } = req.body;

  console.log(title);

  if (!title) {
    return res.status(400).json({
      message: '"title" is required',
    });
  }

  if (!content) {
    return res.status(400).json({
      message: '"content" is required',
    });
  }

  next();
};

module.exports = validatePostInformation;
