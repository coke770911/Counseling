'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TalkRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caseId: {
        type: Sequelize.INTEGER
      },  
      keyinUser: {
        type: Sequelize.STRING
      },
      keyinDate: {
        type: Sequelize.DATE
      },
      refProcessesId: {
        type: Sequelize.INTEGER
      },
      refLevelId: {
        type: Sequelize.INTEGER
      },
      refTheme: {
        type: Sequelize.STRING
      },
      talkContent: {
        type: Sequelize.STRING(4000)
      },
      processPlan: {
        type: Sequelize.STRING(4000)
      },
      refLevelId: {
        type: Sequelize.INTEGER
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TalkRecords');
  }
};