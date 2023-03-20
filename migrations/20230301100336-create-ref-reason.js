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
      reasonName: {
        type: Sequelize.STRING
      },
      isDel: {
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

    await queryInterface.bulkInsert('RefReasons', [
      {
        reasonName: '自行前來',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '中心邀約',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '同學介紹',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '網路預約',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '教官轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '導師轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '行政轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '特教轉介',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '系統轉銜',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        reasonName: '其他',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RefReasons')
  }
}
