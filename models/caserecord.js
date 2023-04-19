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
      // define association here
    }
  }
  
  CaseRecord.init({
    memberUid: DataTypes.STRING,
    memberName: DataTypes.STRING,
    memberGrade: DataTypes.STRING,
    memberClass: DataTypes.STRING,
    caseCreator: DataTypes.STRING,
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