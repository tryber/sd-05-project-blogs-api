// SOLID architecture (for refactoring later);

// const { Users } = require('../models');

// function validateName(name) {
//   if (!name) return { error: true, code: 400, message: '"displayName" is required' };

//   if (name && name.length < 8) {
//     return {
//       error: true,
//       code: 400,
//       message: '"displayName" length must be at least 8 characters long',
//     };
//   }

//   return null;
// }

// function validateEmail(email) {
//   if (!email || email === undefined) {
//     return { error: true, code: 400, message: '"email" is required' };
//   }

//   const RegEx = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
//   const validEmail = RegEx.test(String(email).toLowerCase());

//   if (email && !validEmail) return { error: true, code: 400, message: '"email" is required' };

//   return null;
// }

// function validatePassword(password) {
//   if (!password) return { error: true, code: 400, message: '"password" is required' };

//   if (password && password.length < 6) {
//     return {
//       error: true,
//       code: 400,
//       message: '"password" length must be 6 characters long',
//     };
//   }

//   return null;
// }

// function validateExistence(email) {
//   const user = Users.findOne({ where: { email } });

//   if (user) return { error: true, code: 409, message: 'User already exists' };

//   return null;
// }

// async function validateUser(name, email, password) {
//   await validateExistence(email);
//   const validName = await validateName(name);
//   const validEmail = await validateEmail(email);
//   const validPassword = await validatePassword(password);

//   return { validName, validEmail, validPassword };
// }

// module.exports = validateUser;
