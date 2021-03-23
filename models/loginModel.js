const searchUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      email: DataTypes.STRING,
      password: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );

  return Users;
};

module.exports = searchUsers;
