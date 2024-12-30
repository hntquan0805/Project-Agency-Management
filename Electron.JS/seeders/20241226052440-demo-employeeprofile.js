'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EmployeeProfile', [
      {
        profileCode: 'AC001',
        fullName: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        gender: 'Male',
        cccd: '123456789012',
        dob: new Date('1990-05-15'),
        address: 'Hà Nội, Việt Nam',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        profileCode: 'AC002',
        fullName: 'Trần Thị B',
        email: 'tranthib@example.com',
        gender: 'Female',
        cccd: '234567890123',
        dob: new Date('1985-08-22'),
        address: 'TP. Hồ Chí Minh, Việt Nam',
        phone: '0934567890',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        profileCode: 'AC003',
        fullName: 'Lê Minh C',
        email: 'leminhc@example.com',
        gender: 'Male',
        cccd: '345678901234',
        dob: new Date('1992-02-10'),
        address: 'Đà Nẵng, Việt Nam',
        phone: '0912345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmployeeProfile', null, {});
  },
};
