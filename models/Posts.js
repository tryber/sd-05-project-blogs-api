const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  return user;
};

module.exports = User;
