'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CaseRecords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberUid: {
        type: Sequelize.STRING
      },
      memberName: {
        type: Sequelize.STRING
      },
      memberSex: {
        type: Sequelize.STRING
      },
      memberDept: {
        type: Sequelize.STRING
      },
      memberGrade: {
        type: Sequelize.STRING
      },
      memberClass: {
        type: Sequelize.STRING
      },
      memberIdentity: {
        type: Sequelize.INTEGER
      },
      memberSource: {
        type: Sequelize.INTEGER
      },
      caseCreator: {
        type: Sequelize.STRING
      },
      caseManage: {
        type: Sequelize.STRING
      },
      isClose: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
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
    await queryInterface.dropTable('CaseRecords');
  }
};