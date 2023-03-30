'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RefIdentities', {
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

    await queryInterface.bulkInsert('RefIdentities', [
      {
        content: '一般個案',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '特教生',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '普測高關懷生',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '危機個案',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RefIdentities');
  }
};