'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agency', {
      agencyCode: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.INTEGER,
        references: {
          model: 'AgencyType',
          key: 'type',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      },
      onboardDate: {
        type: Sequelize.DATE
      },
      district: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      currentDebt: {  // Thêm thuộc tính nợ hiện tại
        type: Sequelize.DOUBLE,
        defaultValue: 0, 
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
    await queryInterface.dropTable('Agency');
  }
};