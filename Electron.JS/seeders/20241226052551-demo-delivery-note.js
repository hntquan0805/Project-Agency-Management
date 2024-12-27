'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DeliveryNote', [
      {
        deliveryNoteCode: 'DN001',
        agencyCode: 'AG001',
        deliveryDate: new Date('2024-12-25'),
        createdBy: 'AC001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        deliveryNoteCode: 'DN002',
        agencyCode: 'AG002',
        deliveryDate: new Date('2024-12-26'),
        createdBy: 'AC001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        deliveryNoteCode: 'DN003',
        agencyCode: 'AG003',
        deliveryDate: new Date('2024-12-27'),
        createdBy: 'AC002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DeliveryNote', null, {});
  },
};
