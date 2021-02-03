const verificaEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(String(email).toLowerCase());
};

module.exports = {
  verificaEmail,
};
