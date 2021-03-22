const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    {
      timestamps: false,
    },
  );

  userModel.associate = (models) => {
    userModel.hasMany(models.Posts, { foreignKey: 'userId', as: 'post' });
  };

  return userModel;
};

module.exports = User;
