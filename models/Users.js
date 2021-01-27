const create = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts,
      { foreignKey: 'userId', as: 'user' });
  };

  return Users;
};

module.exports = create;
