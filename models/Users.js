const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    {
      timestamps: false,
    },
  );

  return userModel;
};

module.exports = User;
