const checkPwd = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({
      message: '"password" is required',
    });
  } // função verifica se o campo password está vazio

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  } // verifica de o password tem ao menos 6 caracteres

  next();
};

module.exports = checkPwd;
