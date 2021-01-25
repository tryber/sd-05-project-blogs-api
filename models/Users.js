const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });
  User.assossiate = (models) => {
    User.hasOne(models.Posts, { as: 'Posts', foreignKey: 'userId' });
  };
  return User;
};

module.exports = Users;
