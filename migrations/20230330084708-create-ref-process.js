'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RefProcesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      memo: {
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

    await queryInterface.bulkInsert('RefProcesses', [
      {
        content: '個案追蹤',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '初談',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '續談',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '強制諮商輔導',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '心理測驗施測',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '心理測驗解測',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RefProcesses');
  }
};