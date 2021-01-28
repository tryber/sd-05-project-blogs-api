function createPosts(sequelize, DataTypes) {
  const Posts = sequelize.define(
    'Posts',
    {
      id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.STRING },
      userId: { foreignKey: true, type: DataTypes.INTEGER },
      published: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
      updated: { type: DataTypes.DATE, defaultValue: sequelize.NOW },
    },
    { timestamps: false },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  return Posts;
}

module.exports = createPosts;
