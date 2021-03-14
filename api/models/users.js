// 'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(_models) {
      // define association here
    }
  }
  Users.init(
    {
      displayName: DataTypes.TEXT,
      email: {
        type: DataTypes.TEXT,
        unique: true,

      },
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};
