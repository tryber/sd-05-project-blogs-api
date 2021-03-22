const jwt = require('jsonwebtoken');

// Secret usado pra gerar o token
const segredo = 'senhadificil';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  try {
    const payload = jwt.verify(token, segredo);
    req.userPayload = payload.userData;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
