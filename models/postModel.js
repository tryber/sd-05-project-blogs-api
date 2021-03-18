const PostModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
    },
  );
  Posts.associate = (models) => {
    Posts.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  };
  return Posts;
};

module.exports = PostModel;
