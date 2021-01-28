function Posts(sequelize, DataTypes) {
  const posts = sequelize.define(
    'Posts',
    {
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
    { timestamps: false },
  );
  // https://sequelize.org/master/manual/assocs.html
  posts.associate = (models) => {
    posts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };
  return posts;
}

module.exports = Posts;
