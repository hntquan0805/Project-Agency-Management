'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('DeliveryNoteDetail', {
              deliveryNoteCode: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                  model: 'DeliveryNote',
                  key: 'deliveryNoteCode'
                },
                onUpdate: 'CASCADE'
              },
              productCode: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                  model: 'Inventory',
                  key: 'productCode'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
              type: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              unit: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                  model: 'Unit',
                  key: 'unitName'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
              },
              quantity: {
                type: Sequelize.INTEGER
              },
              unitPrice: {
                type: Sequelize.DOUBLE
              },
              totalPrice: {
                type: Sequelize.DOUBLE
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
            _context.next = 4;
            return regeneratorRuntime.awrap(queryInterface.addConstraint('DeliveryNoteDetail', {
              fields: ['deliveryNoteCode', 'productCode'],
              // Các cột tham gia khóa chính
              type: 'primary key',
              // Loại constraint
              name: 'pk_deliverynotedetail' // Tên constraint (tuỳ chọn)

            }));

          case 4:
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
            return regeneratorRuntime.awrap(queryInterface.removeConstraint('DeliveryNoteDetail', 'pk_deliverynotedetail'));

          case 2:
            _context2.next = 4;
            return regeneratorRuntime.awrap(queryInterface.dropTable('DeliveryNoteDetail'));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};