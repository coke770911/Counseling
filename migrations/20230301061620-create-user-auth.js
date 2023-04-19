'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserAuths', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titleName: {
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
    })

    await queryInterface.bulkInsert('UserAuths', [
      {
        titleName: '總個管員',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        titleName: '專任心理師',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        titleName: '兼任心理師',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        titleName: '實習心理師',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserAuths')
  }
}
