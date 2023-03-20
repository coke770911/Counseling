'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RefThemes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      themeName: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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

    await queryInterface.bulkInsert('RefThemes', [
      {
        themeName: '生活適應',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '人際關係',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '學校適應',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '生涯規劃',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '自我探索',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '情緒困擾',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '經濟壓力',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '健康狀況',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '時間管理',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '行為困擾',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '性別認同',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '情感問題',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '同儕關係',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '師生關係',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '親子關係',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '家庭氣氛',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '學業困擾',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '讀書技巧',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '社團經營',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '休學',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '轉(校、科)',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '重考',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '曠課',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '違反校規',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '升學',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '打工',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '求職技巧',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '技職養成',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        themeName: '抉擇策略',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RefThemes')
  }
}
