'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PaymentReceipt', [
      {
        paymentReceiptCode: 'PR001',
        paymentDate: new Date('2024-12-25'),
        amount: 5000.0, // Số tiền thanh toán
        agencyCode: 'AG001', // Mã đại lý (tham chiếu từ bảng Agency)
        createdBy: 'AC001', // Mã nhân viên tạo (tham chiếu từ bảng EmployeeProfile)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentReceiptCode: 'PR002',
        paymentDate: new Date('2024-12-26'),
        amount: 3500.0,
        agencyCode: 'AG002',
        createdBy: 'AC002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentReceiptCode: 'PR003',
        paymentDate: new Date('2024-12-27'),
        amount: 7000.0,
        agencyCode: 'AG003',
        createdBy: 'AC003',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentReceiptCode: 'PR004',
        paymentDate: new Date('2024-12-28'),
        amount: 4200.0,
        agencyCode: 'AG004',
        createdBy: 'AC001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        paymentReceiptCode: 'PR005',
        paymentDate: new Date('2024-12-29'),
        amount: 1500.0,
        agencyCode: 'AG005',
        createdBy: 'AC002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PaymentReceipt', null, {});
  },
};
