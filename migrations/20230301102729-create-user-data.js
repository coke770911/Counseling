'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account: {
        type: Sequelize.STRING(20)
      },
      password: {
        type: Sequelize.STRING(50)
      },
      username: {
        type: Sequelize.STRING(20)
      },
      userauthId: {
        type: Sequelize.INTEGER
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

    await queryInterface.bulkInsert('UserData', [
      {
        account: 'admin',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '系統帳號',
        userauthId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'fx048',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '張韶砡',
        userauthId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'fz108',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '楊茜燁',
        userauthId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'fz118',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '楊智雅',
        userauthId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'ot221',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '李育珊',
        userauthId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'ot222',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '游富翔',
        userauthId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'fz083',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '徐佐壹',
        userauthId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        account: 'ot088',
        password: '25d55ad283aa400af464c76d713c07ad',
        username: '蔡易勳',
        userauthId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserData')
  }
}
