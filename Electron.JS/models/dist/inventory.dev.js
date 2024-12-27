"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Inventory = sequelize.define('Inventory', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  productName: DataTypes.STRING,
  quantityInStock: DataTypes.INTEGER
}, {
  freezeTableName: true
});
module.exports = {
  Inventory: Inventory
};

var _require3 = require('./distribution'),
    Distribution = _require3.Distribution;

Inventory.hasMany(Distribution, {
  foreignKey: 'productCode',
  sourceKey: 'productCode',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});