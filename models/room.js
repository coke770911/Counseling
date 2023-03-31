'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      /*
      Room.hasOne(models.CalendarData)
      models.CalendarData.belongsTo(Room)
      */
    }
  }
  Room.init({
    title: DataTypes.STRING,
    eventColor: DataTypes.STRING,
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
    modelName: 'Room',
  });
  return Room;
};