function createUser(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      //id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
      displayName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    { timestamps: false },
  );
  // User.associate = (models) => {
  //   User.hasMany(models.Post, { foreignKey: 'userId', as: 'user' });
  // };
  return User;
}

module.exports = createUser;
