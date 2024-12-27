'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.bulkInsert('EmployeeProfile', [{
              profileCode: 'EP001',
              fullName: 'Nguyễn Văn A',
              email: 'nguyenvana@example.com',
              password: 'password123',
              gender: 'Male',
              cccd: '123456789012',
              dob: new Date('1990-05-15'),
              address: 'Hà Nội, Việt Nam',
              phone: '0987654321',
              status: 'Active',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              profileCode: 'EP002',
              fullName: 'Trần Thị B',
              email: 'tranthib@example.com',
              password: 'password456',
              gender: 'Female',
              cccd: '234567890123',
              dob: new Date('1985-08-22'),
              address: 'TP. Hồ Chí Minh, Việt Nam',
              phone: '0934567890',
              status: 'Inactive',
              createdAt: new Date(),
              updatedAt: new Date()
            }, {
              profileCode: 'EP003',
              fullName: 'Lê Minh C',
              email: 'leminhc@example.com',
              password: 'password789',
              gender: 'Male',
              cccd: '345678901234',
              dob: new Date('1992-02-10'),
              address: 'Đà Nẵng, Việt Nam',
              phone: '0912345678',
              status: 'Active',
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
            return regeneratorRuntime.awrap(queryInterface.bulkDelete('EmployeeProfile', null, {}));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};