'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefProcess.init({
    content: DataTypes.STRING,
    memo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RefProcess',
  });
  return RefProcess;
};