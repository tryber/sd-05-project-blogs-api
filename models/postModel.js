const PostModel = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
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
