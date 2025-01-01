const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Inventory = sequelize.define('Inventory', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  productName: DataTypes.STRING,
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  quantityInStock: DataTypes.INTEGER,
}, {
  freezeTableName: true,
});

module.exports = { Inventory };

const { Distribution } = require('./distribution');

Inventory.hasMany(Distribution, {
  foreignKey: 'productCode',
  sourceKey: 'productCode',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Inventory.hasMany(Distribution, {
  foreignKey: 'unit',
  sourceKey: 'unit',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
