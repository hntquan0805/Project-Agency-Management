'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inventory', {
      productCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantityInStock: {
        type: Sequelize.INTEGER
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
    await queryInterface.addConstraint('Inventory', {
      fields: ['productCode', 'unit'],
      type: 'primary key',
      name: 'pk_Inventory',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Inventory');
  }
};
