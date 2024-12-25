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

Inventory.associate = function (models) {
  // define association here
  Inventory.hasMany(models.Distribution, {
    foreignKey: 'productCode',
    // Chỉ định khóa ngoại trong Distribution
    sourceKey: 'productCode',
    // Chỉ định khóa chính trong Inventory
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
};

module.exports = {
  Inventory: Inventory
};