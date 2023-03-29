'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RefReason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  RefReason.init({
    content: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'RefReason'
  })
  return RefReason
}
