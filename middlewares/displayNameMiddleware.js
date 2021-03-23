const checkDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  } // verificando se o displayName existe ou tem ao menos 8 caracteres

  next();
};

module.exports = checkDisplayName;
