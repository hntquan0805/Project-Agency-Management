'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Distribution', [
      {
        productCode: 'PD001',
        type: 1,
        unit: 'Box',
        price: 13000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD001',
        type: 1,
        unit: 'Pack',
        price: 51000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD001',
        type: 1,
        unit: 'Carton',
        price: 600000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD002',
        type: 1,
        unit: 'Box',
        price: 15000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD002',
        type: 1,
        unit: 'Pack',
        price: 58000, // 4 * 15000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD002',
        type: 1,
        unit: 'Carton',
        price: 680000, // 12 * 58000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        type: 1,
        unit: 'Box',
        price: 12000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        type: 1,
        unit: 'Pack',
        price: 47000, // 4 * 12000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        type: 1,
        unit: 'Carton',
        price: 550000, // 12 * 47000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD004',
        type: 1,
        unit: 'Box',
        price: 14000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD004',
        type: 1,
        unit: 'Pack',
        price: 55000, // 4 * 14000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD004',
        type: 1,
        unit: 'Carton',
        price: 650000, // 12 * 55000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        type: 1,
        unit: 'Box',
        price: 16000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        type: 1,
        unit: 'Pack',
        price: 62000, // 4 * 16000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        type: 1,
        unit: 'Carton',
        price: 730000, // 12 * 62000 - giảm một chút
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        productCode: 'PD002',
        type: 2,
        unit: 'Box',
        price: 16000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD002',
        type: 2,
        unit: 'Pack',
        price: 63000, // 4 * 16000 + tăng nhẹ
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD002',
        type: 2,
        unit: 'Carton',
        price: 750000, // 12 * 63000 + tăng nhẹ
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        type: 2,
        unit: 'Box',
        price: 13000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        type: 2,
        unit: 'Pack',
        price: 52000, // 4 * 13000 + tăng nhẹ
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD003',
        type: 2,
        unit: 'Carton',
        price: 620000, // 12 * 52000 + tăng nhẹ
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        type: 2,
        unit: 'Box',
        price: 17000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        type: 2,
        unit: 'Pack',
        price: 68000, // 4 * 17000 + tăng nhẹ
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productCode: 'PD005',
        type: 2,
        unit: 'Carton',
        price: 810000, // 12 * 68000 + tăng nhẹ
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Distribution', null, {});
  },
};
       
