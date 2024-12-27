'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('DeliveryNote', {
              deliveryNoteCode: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true
              },
              agencyCode: {
                type: Sequelize.STRING,
                references: {
                  model: 'Agency',
                  key: 'agencyCode'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
              },
              deliveryDate: {
                type: Sequelize.DATE
              },
              createdBy: {
                type: Sequelize.STRING,
                references: {
                  model: 'Account',
                  key: 'personnelCode'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
            return regeneratorRuntime.awrap(queryInterface.dropTable('DeliveryNote'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};