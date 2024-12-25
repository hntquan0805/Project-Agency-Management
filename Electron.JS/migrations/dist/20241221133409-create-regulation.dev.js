'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('Regulation', {
              name: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                type: Sequelize.STRING
              },
              agencyTypeCount: {
                type: Sequelize.INTEGER
              },
              maxAgenciesPerDistrict: {
                type: Sequelize.INTEGER
              },
              districtCount: {
                type: Sequelize.INTEGER
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
            }));

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
            return regeneratorRuntime.awrap(queryInterface.dropTable('Regulation'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};