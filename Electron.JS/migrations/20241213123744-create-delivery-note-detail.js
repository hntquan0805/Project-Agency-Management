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
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.addConstraint('DeliveryNoteDetail', {
      fields: ['productCode', 'type', 'unit'], // Các cột tham gia khóa ngoại
      type: 'foreign key',
      name: 'fk_deliverynotedetail_distribution', // Tên constraint
      references: {
        table: 'Distribution', // Bảng tham chiếu
        fields: ['productCode', 'type', 'unit'], // Cột tham chiếu
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('DeliveryNoteDetail', 'fk_deliverynotedetail_distribution');
    await queryInterface.removeConstraint('DeliveryNoteDetail', 'pk_deliverynotedetail');
    await queryInterface.dropTable('DeliveryNoteDetail');
  },
};
