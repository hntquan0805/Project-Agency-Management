'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Inventory', [
      {
        productCode: 'PD001',
        productName: 'Banana Milk',
        quantityInStock: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD002',
        productName: 'Coconut Milk',
        quantityInStock: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        productName: 'Strawberry Milk',
        quantityInStock: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD004',
        productName: 'Oat Milk',
        quantityInStock: 8500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        productName: 'Papaya Milk',
        quantityInStock: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Inventory', null, {});
  },
};
