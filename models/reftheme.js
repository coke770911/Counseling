'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefTheme extends Model {
    /**
     * 會談主題
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  RefTheme.init({
    content: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'RefTheme'
  })
  return RefTheme
}
