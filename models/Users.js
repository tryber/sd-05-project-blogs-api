function Users(sequelize, DataTypes) {
  const users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  users.associate = (models) => {
    users.hasMany(models.Posts, {
      foreignKey: 'userId',
      as: 'posts',
    });
  };

  return users;
}

module.exports = { Users };
