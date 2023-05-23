'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CloseRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      caseId: {
        type: Sequelize.INTEGER
      },
      closeReason: {
        type: Sequelize.INTEGER
      },
      keyinUser: {
        type: Sequelize.STRING
      },
      refTheme: {
        type: Sequelize.STRING
      },
      evaluationAnalysis: {
        type: Sequelize.STRING(4000)
      },
      targetAchievement: {
        type: Sequelize.STRING(4000)
      },
      processed: {
        type: Sequelize.STRING(4000)
      },
      futureAdvice: {
        type: Sequelize.STRING(4000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CloseRecords');
  }
};