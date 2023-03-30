'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefIdentity extends Model {
    /**
     * 諮商身分
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefIdentity.init({
    content: DataTypes.STRING,
    memo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RefIdentity',
  });
  return RefIdentity;
};