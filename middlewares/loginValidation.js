const { checkEmail, createToken } = require('../helpers/utils');

const loginValidation = async (req, res, _next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  const user = await checkEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }
  return res.status(200).json(createToken());
  // catch (e) {
  //   return res.status(500).json({ message: 'Erro', error: e });
  // }
};

module.exports = loginValidation;
