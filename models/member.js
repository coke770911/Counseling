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
    birthday: DataTypes.DATE,
    sex: DataTypes.STRING,
    marry: DataTypes.STRING,
    dept: DataTypes.STRING,
    grade: DataTypes.STRING,
    class: DataTypes.STRING,
    mobile: DataTypes.STRING,
    tel: DataTypes.STRING,
    email: DataTypes.STRING,
    is_contact: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    regaddress: DataTypes.STRING,
    contactName: DataTypes.STRING,
    contactRelation: DataTypes.STRING,
    contactTel: DataTypes.STRING,
    contactPhone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};