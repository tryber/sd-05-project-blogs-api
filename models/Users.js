// Model represents tables in the DB
// Conventional to use singular here (User) despite plural in the name (Users)
const User = (sequelize, Datatypes) => {
  const UserModel = sequelize.define('User', {
    // id: { type: Datatypes.INTEGER, primaryKey: true },
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  },
  {
    timestamps: false,
  });

  User.associate = (models) => {
    User.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });
  };
  // foreignKey is always the userId, linking both tables
  // alias is what we are chosing it to be. Here, "post", because "user has many posts".

  return UserModel;
};

module.exports = User;
