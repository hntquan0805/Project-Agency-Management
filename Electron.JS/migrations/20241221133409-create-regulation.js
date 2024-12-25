'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Regulation', {
      name: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING
      },
      agencyTypeCount: {
        type: Sequelize.INTEGER
      },
      maxAgenciesPerDistrict: {
        type: Sequelize.INTEGER
      },
      districtCount: {
        type: Sequelize.INTEGER
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Regulation');
  }
};