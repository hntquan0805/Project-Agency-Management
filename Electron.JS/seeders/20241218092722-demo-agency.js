'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Agency', [
      {
        agentCode: 'AG001',
        name: 'Prime Market',
        phone: '0987654321',
        email: 'primemarket@gmail.com',
        type: 1,
        onboardDate: new Date('2015-11-05'),
        district: '3',
        address: '17 Phan Xich Long, P.10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agentCode: 'AG002',
        name: 'TradeMasters',
        phone: '0912345678',
        email: 'trademasters@gmail.com',
        type: 2,
        onboardDate: new Date('2024-12-21'),
        district: 'Binh Thanh',
        address: '456 Ly Thuong Kiet, Da Nang',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agentCode: 'AG003',
        name: 'Elite Mart',
        phone: '0987651234',
        email: 'elitemart@gmail.com',
        type: 1,
        onboardDate: new Date('2024-08-10'),
        district: '1',
        address: '15 Nguyen Hue, P. Ben Nghe',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agentCode: 'AG004',
        name: 'ValueLine',
        phone: '0987753159',
        email: 'valueline@gmail.com',
        type: 1,
        onboardDate: new Date('2022-01-07'),
        district: 'Binh Thanh',
        address: '75 Le Quang Dinh',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        agentCode: 'AG005',
        name: 'Golden Deals',
        phone: '0987896541',
        email: 'goldendeals@gmail.com',
        type: 2,
        onboardDate: new Date('2024-10-20'),
        district: 'Tan Binh',
        address: '100 Vo Van Kiet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Agency', null, {});
  }
};
