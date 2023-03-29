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
      content: {
        type: Sequelize.STRING
      },
      parentId: {
        type: Sequelize.INTEGER,
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
        content: '生活適應',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '人際關係',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '學校適應',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '生涯規劃',
        parentId: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '自我探索',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '情緒困擾',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '經濟壓力',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '健康狀況',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '時間管理',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '行為困擾',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '性別認同',
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '情感問題',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '同儕關係',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '師生關係',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '親子關係',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '家庭氣氛',
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '學業困擾',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '讀書技巧',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '社團經營',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '休學',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '轉(校、科)',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '重考',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '曠課',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '違反校規',
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '升學',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '打工',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '求職技巧',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '技職養成',
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        content: '抉擇策略',
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
