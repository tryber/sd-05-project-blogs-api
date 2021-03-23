const { User } = require('../models');

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: '"email" is required',
    });
  } // função verifica se o campo email está vazio
  const validateEmail = (emailField) => {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(String(emailField).toLowerCase());
  }; // função padrão para validar email
  if (!validateEmail(req.body.email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  } // Validando se o campo email é inválido
  const verifyEmail = await User.findOne({ where: { email } });
  if (verifyEmail) {
    return res.status(409).json({
      message: 'Usuário já existe',
    });
  } // Validando se esse email já existe no db
  next();
};

module.exports = checkEmail;
