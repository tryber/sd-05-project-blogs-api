module.exports = (sequelize, DataType) => {
  const Posts = sequelize.define(
    "Posts", { id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: DataType.STRING,
    },
    title: {
      allowNull: false,
      type: DataType.STRING,
    },
    content: {
      allowNull: false,
      type: DataType.STRING,
    },
    userId: {
      type: DataType.STRING,
    },
    published: {
      allowNull: false,
      type: DataType.STRING,
    },
    updated: {
      allowNull: false,
      type: DataType.STRING,
    },
  },
  { timestamps: false });

  return Posts;
};
