'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefSource.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'RefSource',
  });
  return RefSource;
};