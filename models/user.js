const createSingleUser = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      displayName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  };

  return User;
};

module.exports = createSingleUser;
