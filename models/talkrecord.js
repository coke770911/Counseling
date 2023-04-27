'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TalkRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TalkRecord.belongsTo(models.UserData, { as: 'refkeyinUser' , targetKey: 'account' , foreignKey: 'keyinUser' })
    }
  }
  TalkRecord.init({
    caseId: DataTypes.INTEGER,
    keyinUser: DataTypes.STRING,
    keyinDate: DataTypes.DATE,
    refProcessesId: DataTypes.INTEGER,
    refLevelId: DataTypes.INTEGER,
    refTheme: DataTypes.INTEGER,
    talkContent: DataTypes.STRING,
    processPlan: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'TalkRecord',
  });
  return TalkRecord;
};