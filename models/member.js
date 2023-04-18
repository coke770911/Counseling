'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init({
    uid: DataTypes.STRING,
    cardId: DataTypes.STRING,
    name: DataTypes.STRING,
    birthday: {
      type: DataTypes.DATE,
      get () {
        return new Date(this.getDataValue('birthday')).toISOString().slice(0, 10)
      }
    },
    age: {
      type: DataTypes.VIRTUAL,
      get () {
        return (new Date()).getYear() - (new Date(this.getDataValue('birthday'))).getYear()
      }
    },
    sex: DataTypes.STRING,
    marry: DataTypes.BOOLEAN,
    dept: DataTypes.STRING,
    grade: DataTypes.STRING,
    class: DataTypes.STRING,
    deptfull: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('dept') + this.getDataValue('grade') + this.getDataValue('class')
      }
    },
    mobile: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    is_contact: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    regaddress: DataTypes.STRING,
    contactName: DataTypes.STRING,
    contactRelation: DataTypes.STRING,
    contactTel: DataTypes.STRING,
    contactPhone: DataTypes.STRING,
    creator: DataTypes.STRING,
    editor: DataTypes.STRING,
    updatedLocal: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('updatedAt').toLocaleString()
      }
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Member',
  });
  return Member;
};