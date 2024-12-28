"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var RevenueReport = sequelize.define('RevenueReport', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  },
  agencyCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  numberOfDeliveryNotes: DataTypes.INTEGER,
  totalValue: DataTypes.DOUBLE,
  rate: DataTypes.DECIMAL
}, {
  freezeTableName: true
});
module.exports = {
  RevenueReport: RevenueReport
};

var _require3 = require('./agency'),
    Agency = _require3.Agency;

RevenueReport.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onUpdate: 'CASCADE'
});