'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DebtHistory', {
      agentCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Agency',
          key: 'agentCode',
        },
        onUpdate: 'CASCADE',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      initialDebt: {
        type: Sequelize.DOUBLE
      },
      endDebt: {
        type: Sequelize.DOUBLE
      },
      incurredDebt: {
        type: Sequelize.DOUBLE
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

    await queryInterface.addConstraint('DebtHistory', {
      fields: ['agentCode', 'date'],
      type: 'primary key',
      name: 'pk_DebtHistory'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DebtHistory');
  }
};