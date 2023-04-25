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
      Calendar.belongsTo(models.UserData, { as: 'refcaseAssign' , targetKey: 'account' , foreignKey: 'caseAssign' })
      Calendar.belongsTo(models.UserData, { as: 'refcaseCreator' , targetKey: 'account' , foreignKey: 'creator' })
      Calendar.belongsTo(models.CaseRecord, { foreignKey: 'caserecordId' })
    }
  }
  Calendar.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    caserecordId: DataTypes.INTEGER,
    caseAssign: DataTypes.STRING,
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
    creator: DataTypes.STRING,
    editor: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Calendar'
  })
  return Calendar
}
