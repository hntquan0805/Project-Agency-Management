const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Distribution } = require('./distribution');

const Inventory = sequelize.define('Inventory', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productName: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER,
}, {
  freezeTableName: true,
});

module.exports = { Inventory };

Inventory.hasMany(Distribution, {
  foreignKey: 'productCode',
  sourceKey: 'productCode',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
