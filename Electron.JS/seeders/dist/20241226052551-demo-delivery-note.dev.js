'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('DeliveryNote', [{
              deliveryNoteCode: 'DN001',
              agencyCode: 'AG001',
              deliveryDate: new Date('2024-12-25'),
              createdBy: 'AC001',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN002',
              agencyCode: 'AG002',
              deliveryDate: new Date('2024-12-26'),
              createdBy: 'AC001',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN003',
              agencyCode: 'AG003',
              deliveryDate: new Date('2024-12-27'),
              createdBy: 'AC002',
              createdAt: new Date(),
              updatedAt: new Date()
            }]));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('DeliveryNote', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};