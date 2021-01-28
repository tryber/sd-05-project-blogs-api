const Posts = (sequelize, DataTypes) => {
  const post = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  { timestamps: false });

  post.associate = (models) => {
    post.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return post;
};

module.exports = Posts;
