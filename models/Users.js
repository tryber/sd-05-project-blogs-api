module.exports = (sequelize, _DataType) => {
  const Users = sequelize.define(
    "Users", {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    displayName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    image: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  { timestamps: false },
  );

  Users.associate = (models) => {
    Users.belongsToMany(models.Posts,
      { foreignKey: 'userId', as: 'posts' });
  };

  return Users;
};
