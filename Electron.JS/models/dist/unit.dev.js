"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var Unit = sequelize.define('Unit', {
  unitName: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  conversionRate: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  baseUnit: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  tableName: 'Unit'
});
module.exports = {
  Unit: Unit
};

var _require3 = require('./distribution'),
    Distribution = _require3.Distribution;

Unit.hasMany(Distribution, {
  foreignKey: 'unit',
  sourceKey: 'unitName',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});