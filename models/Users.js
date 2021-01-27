const Users = (sequelize, DataTypes) => {
  const createUsers = sequelize.define('Users', {
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
      { foreignKey: 'id', as: 'user_id' });
  };

  return createUsers;
};

module.exports = Users;
