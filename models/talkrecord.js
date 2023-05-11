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
      TalkRecord.belongsTo(models.CaseRecord, { as: 'refCase' , foreignKey: 'caseId' })
      TalkRecord.belongsTo(models.UserData, { as: 'refkeyinUser' , targetKey: 'account' , foreignKey: 'keyinUser' })
      TalkRecord.belongsTo(models.RefProcess, { as: 'refProcess' , foreignKey: 'refProcessesId' })
      TalkRecord.belongsTo(models.RefLevel, { as: 'refLevel' , foreignKey: 'refLevelId' })
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
    createdLocal: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('createdAt') === undefined ? '' : this.getDataValue('createdAt').toLocaleString()
      }
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'TalkRecord',
  });
  return TalkRecord;
};