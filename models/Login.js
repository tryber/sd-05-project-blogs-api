const login = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  return User;
};

module.exports = login;
