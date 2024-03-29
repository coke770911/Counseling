'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CloseRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CloseRecord.belongsTo(models.UserData, { as: 'refkeyinUser' , targetKey: 'account' , foreignKey: 'keyinUser' })
    }
  }
  CloseRecord.init({
    caseId: DataTypes.INTEGER,
    closeReason: DataTypes.INTEGER,
    keyinUser: DataTypes.STRING,
    refTheme: DataTypes.STRING,
    evaluationAnalysis: DataTypes.STRING,
    targetAchievement: DataTypes.STRING,
    processed: DataTypes.STRING,
    futureAdvice: DataTypes.STRING
  }, {
    paranoid: true,
    sequelize,
    modelName: 'CloseRecord',
  });
  return CloseRecord;
};