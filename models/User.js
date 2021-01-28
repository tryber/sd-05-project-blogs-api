const User = (sequelize, Datatypes) => {
  const UserModel = sequelize.define('User', {
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  });

  UserModel.associate = (models) => {
    UserModel.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });
  };

  return UserModel;
};

module.exports = User;
