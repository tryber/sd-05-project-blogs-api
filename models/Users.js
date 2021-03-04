const Users = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  })
};

module.exports = Users;
