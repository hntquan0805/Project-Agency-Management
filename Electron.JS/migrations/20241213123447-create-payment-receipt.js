'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentReceipt', {
      paymentReceiptCode: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      agencyCode: {
        type: Sequelize.STRING,
        references: {
          model: 'Agency',
          key: 'agencyCode'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdBy: {
        type: Sequelize.STRING,
        references: {
          model: 'Account',
          key: 'username'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.dropTable('PaymentReceipt');
  }
};
