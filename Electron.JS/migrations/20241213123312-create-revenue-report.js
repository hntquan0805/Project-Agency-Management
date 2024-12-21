'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RevenueReport', {
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      agencyCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Agency',
          key: 'agencyCode',
        },
        onUpdate: 'CASCADE',
      },
      numberOfDeliveryNotes: {
        type: Sequelize.INTEGER
      },
      totalValue: {
        type: Sequelize.DOUBLE
      },
      rate: {
        type: Sequelize.DECIMAL
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

    await queryInterface.addConstraint('RevenueReport', {
      fields: ['date', 'agencyCode'],
      type: 'primary key',
      name: 'pk_RevenueReport'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RevenueReport');
  }
};
