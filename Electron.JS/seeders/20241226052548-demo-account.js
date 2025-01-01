'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Account', [
      {
        username: 'AC001',
        password: '123',
        position: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'AC002',
        password: '123',
        position: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'AC003',
        password: '123',
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
