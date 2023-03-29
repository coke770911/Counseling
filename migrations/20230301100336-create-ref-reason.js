'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RefReasons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
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

    await queryInterface.bulkInsert('RefReasons', [
      {
        content: '自行前來',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '中心邀約',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '同學介紹',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '網路預約',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '教官轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '導師轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '輔導員轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '行政轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '特教轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '系統轉銜',
        createdAt: new Date(),
        updatedAt: new Date()
      }, { 
        content: '其他',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RefReasons')
  }
}
