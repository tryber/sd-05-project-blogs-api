const PostModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
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

module.exports = PostModel;
