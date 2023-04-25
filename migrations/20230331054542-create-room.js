'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      eventColor: {
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
    });

    await queryInterface.bulkInsert('Rooms', [
      {
        title: '諮商室A',
        eventColor: '#3399FF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '諮商室B',
        eventColor: '#3399FF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '諮商室C',
        eventColor: '#3399FF',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ,
      {
        title: '團體諮商室',
        eventColor: '#3399FF',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};