const { User } = require('../models');

const checkUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  // verificando se o displayName existe ou tem ao menos 8 caracteres
  if (!displayName || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  
  // função verifica se o campo email está vazio
  if (!email) {
    return res.status(400).json({
      message: '"email" is required',
    });
  }
  
  // função verifica se o campo password está vazio
  if (!password) {
    return res.status(400).json({
      message: '"password" is required',
    });
  }
  
  // função padrão para validar email
  const validateEmail = (emailField) => {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(String(emailField).toLowerCase());
  };
  
  // Validando se o campo email é inválido
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  // verifica de o password tem ao menos 6 caracteres
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }

  // // Validando se esse email já existe no db
  const verifyEmail = await User.findOne({ where: { email } });

  if (verifyEmail) return res.status(409).json({
      message: 'Usuário já existe',
    });

  next();
};

module.exports = checkUser;