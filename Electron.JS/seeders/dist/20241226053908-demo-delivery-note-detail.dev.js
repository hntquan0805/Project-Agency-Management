'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('DeliveryNoteDetail', [{
              deliveryNoteCode: 'DN001',
              productCode: 'PD001',
              // Sản phẩm 'Banana Milk' từ Inventory
              type: 1,
              // Loại sản phẩm
              unit: 'Box',
              // Đơn vị sử dụng từ bảng 'Unit'
              quantity: 10,
              unitPrice: 100.0,
              totalPrice: 1000.0,
              // unitPrice * quantity
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN001',
              productCode: 'PD002',
              // Sản phẩm 'Coconut Milk' từ Inventory
              type: 1,
              // Loại sản phẩm
              unit: 'Pack',
              // Đơn vị sử dụng từ bảng 'Unit'
              quantity: 5,
              unitPrice: 50.0,
              totalPrice: 250.0,
              // unitPrice * quantity
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN002',
              productCode: 'PD003',
              // Sản phẩm 'Strawberry Milk' từ Inventory
              type: 2,
              unit: 'Carton',
              // Đơn vị sử dụng từ bảng 'Unit'
              quantity: 20,
              unitPrice: 150.0,
              totalPrice: 3000.0,
              // unitPrice * quantity
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN002',
              productCode: 'PD004',
              // Sản phẩm 'Oat Milk' từ Inventory
              type: 2,
              unit: 'Box',
              // Đơn vị sử dụng từ bảng 'Unit'
              quantity: 8,
              unitPrice: 75.0,
              totalPrice: 600.0,
              // unitPrice * quantity
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN003',
              productCode: 'PD005',
              // Sản phẩm 'Papaya Milk' từ Inventory
              type: 1,
              unit: 'Pack',
              // Đơn vị sử dụng từ bảng 'Unit'
              quantity: 15,
              unitPrice: 120.0,
              totalPrice: 1800.0,
              // unitPrice * quantity
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              deliveryNoteCode: 'DN003',
              productCode: 'PD001',
              // Sản phẩm 'Banana Milk' từ Inventory
              type: 1,
              unit: 'Carton',
              // Đơn vị sử dụng từ bảng 'Unit'
              quantity: 10,
              unitPrice: 60.0,
              totalPrice: 600.0,
              // unitPrice * quantity
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
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('DeliveryNoteDetail', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};