const createPosts = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Post', {
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

  return Posts;
};

module.exports = createPosts;


// id: 1,
// title: 'Post do Ano',
// content: 'Melhor post do ano',
// userId: 1,
// published: new Date('2011-08-01T19:58:00.000Z'),
// updated: new Date('2011-08-01T19:58:51.000Z'),
