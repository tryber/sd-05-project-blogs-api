const createPosts = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, onUpdate: DataTypes.NOW },
  },
  {
    timestamps: false,
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.Users,
      { foreignKey: 'id', as: 'user' });
  };

  return Posts;
};

module.exports = createPosts;

// id: 1,
// title: 'Post do Ano',
// content: 'Melhor post do ano',
// userId: 1,
// published: new Date('2011-08-01T19:58:00.000Z'),
// updated: new Date('2011-08-01T19:58:51.000Z'),
