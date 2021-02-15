const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Posts,
      { foreignKey: 'userId', as: 'userPosts' });
  };

  return User;
};

module.exports = UserModel;
