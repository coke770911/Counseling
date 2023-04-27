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
      
    }
  }
  UserData.init({
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    color: DataTypes.STRING,
    textColor: DataTypes.STRING,
    userauthId: DataTypes.INTEGER,
    isDisabled: DataTypes.BOOLEAN,
    isDisabledName: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('isDisabled') ? '停用' : '啟用'
      }
    },
    updatedLocal: {
      type: DataTypes.VIRTUAL,
      get () {
        return this.getDataValue('updatedAt').toLocaleString()
      }
    }
  }, {
    sequelize,
    paranoid: true,
    modelName: 'UserData'
  })
  return UserData
}
