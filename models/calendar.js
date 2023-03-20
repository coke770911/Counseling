'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CalendarData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  CalendarData.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    setstaff: DataTypes.STRING,
    venuespaceId: DataTypes.INTEGER,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    allDay: DataTypes.BOOLEAN,
    creatorPople: DataTypes.STRING,
    modifyPople: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CalendarData'
  })
  return CalendarData
}
