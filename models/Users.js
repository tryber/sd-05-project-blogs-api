function createUsers(sequelize, DataTypes) {
  const Users = sequelize.define(
    'Users',
    {
      id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
      displayName: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING, defaultValue: '' },
    },
    { timestamps: false },
  );

  return Users;
}

module.exports = createUsers;
