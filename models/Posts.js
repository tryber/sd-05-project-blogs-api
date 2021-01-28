const Posts = (sequelize, DataTypes) => {
  const createPosts = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users,
      { foreignKey: 'id', as: 'userId' });
  };

  return createPosts;
};

module.exports = Posts;
