"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var RevenueReport = sequelize.define('RevenueReport', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  agentCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfDeliveryNotes: DataTypes.INTEGER,
  totalValue: DataTypes.DOUBLE,
  rate: DataTypes.DECIMAL
}, {
  freezeTableName: true
});

RevenueReport.associate = function (models) {
  RevenueReport.belongsTo(models.Agency, {
    foreignKey: 'agencyCode',
    targetKey: 'agencyCode',
    onUpdate: 'CASCADE'
  });
};

module.exports = {
  RevenueReport: RevenueReport
};