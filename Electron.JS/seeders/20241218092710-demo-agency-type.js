'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AgencyType', [
      {
        type: 1,
        productCount: 5,
        unitCount: 3,
        maxDebt: 20000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 2,
        productCount: 5,
        unitCount: 3,
        maxDebt: 50000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AgencyType', null, {});
  },
};
