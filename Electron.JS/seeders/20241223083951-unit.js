'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Unit', [
      {
        unitName: 'Box', // 1 hộp tiêu chuẩn
        conversionRate: 1, // 1 Box = 1 liter
        baseUnit: 'liter', // Đơn vị cơ bản là liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        unitName: 'Pack', // Lốc (4 hộp)
        conversionRate: 4, // 1 Pack = 4 liters
        baseUnit: 'liter', // Đơn vị cơ bản là liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        unitName: 'Carton', // Thùng sữa chứa 12 lốc (48 hộp)
        conversionRate: 48, // 1 Carton = 48 liters (48 hộp x 1 liter/hộp)
        baseUnit: 'liter', // Đơn vị cơ bản là liter
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Unit', null, {});
  },
};
