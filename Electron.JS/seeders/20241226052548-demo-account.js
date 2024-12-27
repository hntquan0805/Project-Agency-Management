'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Account', [
      {
        personnelCode: 'AC001',
        profileCode: 'EP001',
        position: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        personnelCode: 'AC002',
        profileCode: 'EP002',
        position: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        personnelCode: 'AC003',
        profileCode: 'EP003',
        position: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Account', null, {});
  },
};
