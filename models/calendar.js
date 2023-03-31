'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Calendar.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    memberId: DataTypes.STRING,
    major: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    resourceId: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('roomId')
      }
    },
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    allDay: DataTypes.BOOLEAN,
    isInterview: DataTypes.BOOLEAN,
    creator: DataTypes.STRING,
    editor: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Calendar'
  })
  return Calendar
}
