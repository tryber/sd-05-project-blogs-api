const PostModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { foreignKey: true, type: DataTypes.INTEGER },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, {
      foreignKey: 'userId', as: 'user',
    });
  };

  return Posts;
};

module.exports = PostModel;
