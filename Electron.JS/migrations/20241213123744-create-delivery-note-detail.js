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

    await queryInterface.addConstraint('DeliveryNoteDetail', {
      fields: ['deliveryNoteCode', 'productCode', 'unit'],
      type: 'primary key',
      name: 'pk_deliverynotedetail',
    });

    await queryInterface.addConstraint('DeliveryNoteDetail', {
      fields: ['productCode', 'unit'],
      type: 'foreign key',
      name: 'fk_DeliveryNoteDetail_Inventory',
      references: {
        table: 'Inventory',
        fields: ['productCode', 'unit'],
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('DeliveryNoteDetail', 'pk_deliverynotedetail');
    await queryInterface.dropTable('DeliveryNoteDetail');
  },
};
