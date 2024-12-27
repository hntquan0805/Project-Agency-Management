"use strict";

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

var _require2 = require('../config/database'),
    sequelize = _require2.sequelize;

var PaymentReceipt = sequelize.define('PaymentReceipt', {
  paymentReceiptCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  paymentDate: DataTypes.DATE,
  amount: DataTypes.DOUBLE,
  agentCode: DataTypes.STRING,
  createdBy: DataTypes.STRING
}, {
  freezeTableName: true
});
module.exports = {
  PaymentReceipt: PaymentReceipt
};

var _require3 = require('./account'),
    Account = _require3.Account;

var _require4 = require('./agency'),
    Agency = _require4.Agency;

PaymentReceipt.belongsTo(Account, {
  foreignKey: 'createdBy',
  targetKey: 'personnelCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});
PaymentReceipt.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});