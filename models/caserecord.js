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

      CaseRecord.belongsTo(models.Member, { as: 'refMember' , targetKey: 'uid' , foreignKey: 'memberUid' })
      CaseRecord.belongsTo(models.UserData, { as: 'refcaseCreator' , targetKey: 'account' , foreignKey: 'caseCreator' })
      CaseRecord.belongsTo(models.UserData, { as: 'refcaseManage' , targetKey: 'account' , foreignKey: 'caseManage' })
      CaseRecord.belongsTo(models.UserData, { as: 'refcaseAssign' , targetKey: 'account' , foreignKey: 'caseAssign' })
      CaseRecord.belongsTo(models.RefIdentity, { as: 'refIdentity' , foreignKey: 'memberIdentity' })
      CaseRecord.belongsTo(models.RefSource, { as: 'refSource' , foreignKey: 'memberSource' })
      CaseRecord.hasMany(models.TalkRecord,{ as: 'hasTalkRecord' , foreignKey: 'caseId' });
    }
  }
  
  CaseRecord.init({
    memberUid: DataTypes.STRING,
    memberName: DataTypes.STRING,
    memberSex: DataTypes.STRING,
    memberDept: DataTypes.STRING,
    memberGrade: DataTypes.STRING,
    memberClass: DataTypes.STRING,
    memberDeptFull: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('memberDept') + this.getDataValue('memberGrade') + this.getDataValue('memberClass')
      }
    },
    memberIdentity: DataTypes.INTEGER,
    memberSource: DataTypes.INTEGER,
    caseCreator: DataTypes.STRING,
    caseManage: DataTypes.STRING,
    caseAssign: DataTypes.STRING,
    isAssign: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('caseAssign') === null ? '未指派心理師' : '已指派心理師'
      }
    },
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
        return this.getDataValue('createdAt') === undefined ? '' : this.getDataValue('createdAt').toLocaleString()
      }
    },
    updatedLocal: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('updatedAt') === undefined ? '' : this.getDataValue('updatedAt').toLocaleString()
      }
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'CaseRecord',
  });

  return CaseRecord;
};