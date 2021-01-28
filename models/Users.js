const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  Users.associate = (models) => {
    Users.hasOne(models.Posts,
      { foreignKey: 'userId', as: 'user' });
  };

  return Users;
};

module.exports = createUsers;
