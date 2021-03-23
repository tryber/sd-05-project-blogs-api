const create = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: { type: DataTypes.STRING },
      image: {
        type: DataTypes.STRING,
        defaultValue: '',
      },
    },
    { timestamps: false },
  );
  Users.associate = (models) => {
    Users.hasMany(models.Posts, { foreignKey: 'userId', as: 'user' });
  };
  return Users;
};

module.exports = create;
