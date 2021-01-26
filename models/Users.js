// Model represents tables in the DB
// Conventional to use singular here (User) despite plural in the name (Users)
const User = (sequelize, Datatypes) => {
  const UserModel = sequelize.define('User', {
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  });

  UserModel.associate = (models) => {
    UserModel.hasOne(models.Post, { as: 'posts', foreignKey: 'userId' });
  };

  return UserModel;
};

module.exports = User;
