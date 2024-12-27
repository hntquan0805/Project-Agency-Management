const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Account = sequelize.define('Account', {
    personnelCode: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    profileCode: {
        type: DataTypes.STRING,
    },
    position: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    tableName: 'Account',
});

module.exports = { Account };

const { DeliveryNote } = require('./deliverynote');
const { EmployeeProfile } = require('./employeeprofile');
const { PaymentReceipt } = require('./paymentreceipt');

Account.hasMany(DeliveryNote, {
    foreignKey: 'createdBy',
    sourceKey: 'personnelCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  
  Account.belongsTo(EmployeeProfile, {
    foreignKey: 'profileCode',
    targetKey: 'profileCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });
  
  Account.hasMany(PaymentReceipt, {
    foreignKey: 'createdBy',
    sourceKey: 'personnelCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  });