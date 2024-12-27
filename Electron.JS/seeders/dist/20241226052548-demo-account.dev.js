'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('Account', [{
              personnelCode: 'AC001',
              profileCode: 'EP001',
              position: 'Manager',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              personnelCode: 'AC002',
              profileCode: 'EP002',
              position: 'Staff',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              personnelCode: 'AC003',
              profileCode: 'EP003',
              position: 'Staff',
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
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('Account', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};