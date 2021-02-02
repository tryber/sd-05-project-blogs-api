const isLogged = (req, res, next) => {
  const errorMessage = '"password" is not allowed to be empty';
  const { email, password } = req.body;
  const regEx = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  if (email === '') {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === '') {
    return res.status(400).json({ message: errorMessage });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (!email || !password || !regEx.test(email)) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  next();
};

module.exports = isLogged;
