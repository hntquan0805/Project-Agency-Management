'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RevenueReport', {
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      agentCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Agency',
          key: 'agentCode',
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
      fields: ['date', 'agentCode'],
      type: 'primary key',
      name: 'pk_RevenueReport'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RevenueReport');
  }
};
