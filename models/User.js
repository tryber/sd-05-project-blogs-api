const User = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'User',
    {
      displayname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
  );

  user.associate = (model) => {
    user.hasMany(model.Post, { foreignKey: 'userId', as: 'posts' });
  };

  return user;
};

module.exports = User;
