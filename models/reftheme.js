'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefTheme extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  RefTheme.init({
    themeName: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    isDel: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RefTheme'
  })
  return RefTheme
}
