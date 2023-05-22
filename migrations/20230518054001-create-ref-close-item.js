'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RefCloseItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });

    await queryInterface.bulkInsert('RefCloseItems', [
      {
        content: '諮商目標已達成',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '學期結束',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '休學',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '轉學',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        content: '退學',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        content: '轉換其他心理師',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        content: '學生不願繼續會談',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        content: '其它',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RefCloseItems');
  }
};