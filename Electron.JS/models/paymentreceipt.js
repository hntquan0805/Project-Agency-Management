const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PaymentReceipt = sequelize.define('PaymentReceipt', {
  paymentReceiptCode: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  paymentDate: DataTypes.DATE,
  amount: DataTypes.DOUBLE,
  agentCode: DataTypes.STRING,
  createdBy: DataTypes.STRING
}, {
  freezeTableName: true,
});

module.exports = { PaymentReceipt };

const { Account } = require('./account');
const { Agency } = require('./agency');

// Thiết lập mối quan hệ với Account
PaymentReceipt.belongsTo(Account, {
  foreignKey: 'createdBy',
  targetKey: 'username',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});

// Thiết lập mối quan hệ với Agency
PaymentReceipt.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});