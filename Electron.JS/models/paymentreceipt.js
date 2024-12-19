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

PaymentReceipt.associate = function(models) {
  this.belongsTo(models.Account, {
    foreignKey: 'createdBy',
    targetKey: 'personnelCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  this.belongsTo(models.Agency, {
    foreignKey: 'agencyCode',
    targetKey: 'agencyCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
};

module.exports = { PaymentReceipt };