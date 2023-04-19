'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaseRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      //CaseRecord.hasOne(models.UserData,{ as: 'aaa', sourceKey: 'caseCreator', foreignKey: 'account' });
      CaseRecord.belongsTo(models.UserData, { as: 'refcaseCreator' , targetKey: 'account' , foreignKey: 'caseCreator' })
      CaseRecord.belongsTo(models.UserData, { as: 'refcaseManage' , targetKey: 'account' , foreignKey: 'caseManage' })
      CaseRecord.belongsTo(models.UserData, { as: 'refassignUser' , targetKey: 'account' , foreignKey: 'assignUser' })

    }
  }
  
  CaseRecord.init({
    memberUid: DataTypes.STRING,
    memberName: DataTypes.STRING,
    memberGrade: DataTypes.STRING,
    memberClass: DataTypes.STRING,
    caseCreator: DataTypes.STRING,
    caseManage: DataTypes.STRING,
    assignUser: DataTypes.STRING,
    isClose: DataTypes.BOOLEAN,
    isCloseName: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('isClose') ? '已結案' : '未結案'
      }
    },
    createdLocal: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('createdAt').toLocaleString()
      }
    },
    updatedLocal: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('updatedAt').toLocaleString()
      }
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CaseRecord',
  });

  return CaseRecord;
};