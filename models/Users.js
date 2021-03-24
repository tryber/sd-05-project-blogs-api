module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    'Users', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER(1),
      },
      displayName: { type: DataType.STRING },
      email: { type: DataType.STRING },
      password: { type: DataType.STRING },
      image: { type: DataType.STRING },
    },
    { timestamps: false },
  );

  Users.associate = (models) => {
    Users.hasMany(models.Posts, { foreignKey: 'userId', as: 'user id' });
  };

  return Users;
};
