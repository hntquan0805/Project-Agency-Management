'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inventory', {
      productCode: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      productName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Inventory');
  }
};
