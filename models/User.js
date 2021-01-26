const createUsers = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'post' });
  };
  return User;
};

module.exports = createUsers;
