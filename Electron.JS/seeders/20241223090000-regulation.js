'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Regulation', [
      {
        name: 'RE001',
        agencyTypeCount: 2,
        maxAgenciesPerDistrict: 4,
        districtCount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Regulation', null, {});
  },
};
