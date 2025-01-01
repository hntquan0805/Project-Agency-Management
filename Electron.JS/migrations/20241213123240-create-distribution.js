'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Distribution', {
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
        fields: ['productCode', 'type', 'unit'],
        type: 'primary key',
        name: 'pk_Distribution',
      });

    await queryInterface.addConstraint('Distribution', {
      fields: ['productCode', 'unit'],
      type: 'foreign key',
      name: 'fk_Distribution_Inventory',
      references: {
        table: 'Inventory',
        fields: ['productCode', 'unit'],
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Distribution');
  }
};
