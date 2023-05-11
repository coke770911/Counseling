'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RefLevels', {
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

    await queryInterface.bulkInsert('RefLevels', [
      {
        content: '綠',
        memo: '個案狀況穩定，可結案。',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '黃',
        memo: '個案危機狀況已解除，但仍有意願續談。',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '橙',
        memo: '個案有嚴重情緒/精神困擾，需個管持續介入輔導。',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '紅',
        memo: '個案有高度自殺/自傷或傷人之危機。',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RefLevels');
  }
};