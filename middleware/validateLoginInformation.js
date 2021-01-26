const validateLoginInformation = (req, res, next) => {
  const { email, password } = req.body;
  const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  if (!email || !password || !regEx.test(email)) {
    return res.status(400).json({
      message: 'Campos inválidos',
    });
  }

  next();
};

module.exports = validateLoginInformation;
