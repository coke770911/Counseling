'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  UserData.init({
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    userauthId: DataTypes.INTEGER,
    isDisabled: {
      type: DataTypes.BOOLEAN,
      get () {
        return this.getDataValue('isDisabled') ? '停用' : '啟用'
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get () {
        return this.getDataValue('updatedAt').toLocaleString()
      },
      set (value) {
        return this.setDataValue('updatedAt', value)
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'UserData'
  })
  return UserData
}
