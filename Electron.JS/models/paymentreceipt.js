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
  agencyCode: DataTypes.STRING,
  createdBy: DataTypes.STRING
}, {
  freezeTableName: true,
});

module.exports = { PaymentReceipt };

const { Account } = require('./account');
const { Agency } = require('./agency');

PaymentReceipt.belongsTo(Account, {
  foreignKey: 'createdBy',
  targetKey: 'username',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

PaymentReceipt.belongsTo(Agency, {
  foreignKey: 'agencyCode',
  targetKey: 'agencyCode',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});