const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { DeliveryNote } = require('./deliverynote');
const { EmployeeProfile } = require('./employeeprofile');
const { PaymentReceipt } = require('./paymentreceipt');

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

Account.hasMany(DeliveryNote, {
    foreignKey: 'createBy',
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
    foreignKey: 'createBy',
    sourceKey: 'personnelCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});