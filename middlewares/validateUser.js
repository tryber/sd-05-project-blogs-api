function validateName(req) {
  const { displayName } = req.body;

  if (!displayName) return { error: true, code: 400, message: '"displayName" is required' };

  if (displayName && displayName.length < 8) {
    return {
      error: true,
      code: 400,
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return null;
}

function validateEmail(req) {
  const { email } = req.body;

  if (!email || email === undefined) {
    return { error: true, code: 400, message: '"email" is required' };
  }

  const RegEx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  const validEmail = RegEx.test(String(email).toLowerCase());

  if (!validEmail) return { error: true, code: 400, message: '"email" must be a valid email' };

  return null;
}

function validatePassword(req) {
  const { password } = req.body;

  if (!password) return { error: true, code: 400, message: '"password" is required' };

  if (password.length < 6) {
    return {
      error: true,
      code: 400,
      message: '"password" length must be 6 characters long',
    };
  }

  return null;
}

async function validateUser(req, res, next) {
  const invalidName = await validateName(req);

  if (invalidName) {
    return res.status(invalidName.code).json({ message: invalidName.message });
  }

  const invalidEmail = await validateEmail(req);

  if (invalidEmail) {
    res.status(invalidEmail.code).json({ message: invalidEmail.message });
  }

  const invalidPassword = await validatePassword(req);

  if (invalidPassword) {
    res.status(invalidPassword.code).json({ message: invalidPassword.message });
  }

  return next();
}

module.exports = validateUser;
