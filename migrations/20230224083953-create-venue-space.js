'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('VenueSpaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spaceName: {
        type: Sequelize.STRING
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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

    await queryInterface.bulkInsert('VenueSpaces', [
      {
        spaceName: '諮商室A',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        spaceName: '諮商室B',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        spaceName: '諮商室C',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        spaceName: '研討室',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('VenueSpaces')
  }
}
