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
        onDelete: 'CASCADE',
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
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Unit',
          key: 'unitName',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      fields: ['deliveryNoteCode', 'productCode', 'unit'],
      type: 'primary key',
      name: 'pk_deliverynotedetail',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('DeliveryNoteDetail', 'pk_deliverynotedetail');
    await queryInterface.dropTable('DeliveryNoteDetail');
  },
};
