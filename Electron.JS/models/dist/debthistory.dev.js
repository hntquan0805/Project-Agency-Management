"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var DebtHistory = sequelize.define('DebtHistory', {
  agencyCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  initialDebt: {
    type: DataTypes.DOUBLE
  },
  endDebt: {
    type: DataTypes.DOUBLE
  },
  incurredDebt: {
    type: DataTypes.DOUBLE
  }
}, {
  freezeTableName: true,
  tableName: 'DebtHistory'
});
module.exports = {
  DebtHistory: DebtHistory
};

var _require3 = require('./agency'),
    Agency = _require3.Agency; // Thiết lập mối quan hệ với Agency


DebtHistory.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onUpdate: 'CASCADE'
});