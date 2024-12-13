'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Account', {
      personnelCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      profileCode: {
        type: Sequelize.STRING,
        references: {
          model: 'EmployeeProfile',
          key: 'profileCode',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      position: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Account');
  }
};