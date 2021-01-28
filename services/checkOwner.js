const checkOwner = async (req, userId) => {
  const { id } = req.user;

  if (id !== userId) return { err: { status: 401, message: 'Usuário não autorizado' } };

  return null;
};

module.exports = checkOwner;
