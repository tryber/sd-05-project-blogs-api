const create = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
    },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return Posts;
};

module.exports = create;
