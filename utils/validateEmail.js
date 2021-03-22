const validateEmail = (email) => {
  // regex retirado do repositorio do Felipe Vieira, turma 5
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email)) {
    return false;
  }

  return true;
};

module.exports = validateEmail;
