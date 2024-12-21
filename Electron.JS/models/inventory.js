const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productName: DataTypes.STRING,
  price: DataTypes.DOUBLE,
  quantityInStock: DataTypes.INTEGER
}, {
  freezeTableName: true,
});

Inventory.associate = function(models) {
  // define association here
};

module.exports = { Inventory };