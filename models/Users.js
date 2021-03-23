module.exports = (sequelize, DataType) => {
  const Users = sequelize.define(
    "Users", {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: DataType.STRING,
    },
    displayName: {
      allowNull: false,
      type: DataType.STRING,
    },
    email: {
      allowNull: false,
      type: DataType.STRING,
    },
    password: {
      allowNull: false,
      type: DataType.STRING,
    },
    image: {
      allowNull: false,
      type: DataType.STRING,
    },
  },
  { timestamps: false },
  );

  Users.associate = (models) => {
    Users.hasMany(models.Posts, { foreignKey: 'userId', as: 'user id' });
  }

  return Users;
};
