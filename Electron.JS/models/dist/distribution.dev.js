"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Distribution = sequelize.define('Distribution', {
  productCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  price: DataTypes.DOUBLE
}, {
  freezeTableName: true,
  tableName: 'Distribution'
});
module.exports = {
  Distribution: Distribution
};

var _require3 = require('./inventory'),
    Inventory = _require3.Inventory;

var _require4 = require('./unit'),
    Unit = _require4.Unit;

Distribution.belongsTo(Inventory, {
  foreignKey: 'productCode',
  targetKey: 'productCode',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
Distribution.belongsTo(Unit, {
  foreignKey: 'unit',
  targetKey: 'unitName',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});