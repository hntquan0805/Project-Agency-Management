'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeliveryNote', {
      deliveryNoteCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      agencyCode: {
        type: Sequelize.STRING,
        references: {
          model: 'Agency',
          key: 'agencyCode',
        },
        onUpdate: 'CASCADE',
      },
      deliveryDate: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING,
        references: {
          model: 'Account',
          key: 'username',
        },
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
    await queryInterface.dropTable('DeliveryNote');
  }
};