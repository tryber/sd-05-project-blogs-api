const findLogin = (sequelize, DataTypes) => {
  const Login = sequelize.define('Login', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  return Login;
};

module.exports = findLogin;
