const User = (sequelize, DataTypes) => {
  const newUser = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });

  newUser.associate = (models) => newUser.hasMany(models.Post, { as: 'user', foreignKey: 'userId' });

  return newUser;
};

module.exports = User;
