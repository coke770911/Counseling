'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cardId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      sex: {
        type: Sequelize.STRING
      },
      marry: {
        type: Sequelize.BOOLEAN
      },
      dept: {
        type: Sequelize.STRING
      },
      grade: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      is_contact: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING
      },
      regaddress: {
        type: Sequelize.STRING
      },
      contactName: {
        type: Sequelize.STRING
      },
      contactRelation: {
        type: Sequelize.STRING
      },
      contactTel: {
        type: Sequelize.STRING
      },
      contactPhone: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Members');
  }
};