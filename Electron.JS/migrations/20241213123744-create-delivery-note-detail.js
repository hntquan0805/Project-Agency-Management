'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeliveryNoteDetail', {
      deliveryNoteCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'DeliveryNote',
          key: 'deliveryNoteCode',
        },
        onUpdate: 'CASCADE',
      },
      productCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Inventory',
          key: 'productCode',
        },
        onUpdate: 'CASCADE',
      },
      unit: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      unitPrice: {
        type: Sequelize.DOUBLE,
      },
      totalPrice: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Thiết lập khóa chính tổng hợp
    await queryInterface.addConstraint('DeliveryNoteDetail', {
      fields: ['deliveryNoteCode', 'productCode'], // Các cột tham gia khóa chính
      type: 'primary key', // Loại constraint
      name: 'pk_deliverynotedetail', // Tên constraint (tuỳ chọn)
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DeliveryNoteDetail');
  },
};
