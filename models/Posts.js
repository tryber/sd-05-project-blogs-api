const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    published: {
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
    updated: {
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
    userId: {
      foreignKey: true,
      type: DataTypes.INTEGER
    },
  }, { timestamps: false });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Post;
};

module.exports = createPost;
