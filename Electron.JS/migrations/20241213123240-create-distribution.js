'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Distribution', {
      productCode: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'Inventory', // Tên bảng Inventory
            key: 'productCode', // Trường trong Inventory
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
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Distribution', {
        fields: ['productCode', 'type', 'unit'], // Các cột tham gia khóa chính
        type: 'primary key', // Loại constraint
        name: 'pk_Distribution', // Tên constraint (tuỳ chọn)
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Distribution');
  }
};
