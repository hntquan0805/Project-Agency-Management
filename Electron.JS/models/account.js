const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { DeliveryNote } = require('./deliverynote');
const { EmployeeProfile } = require('./employeeprofile');
const { PaymentReceipt } = require('./paymentreceipt');

const Account = sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
    foreignKey: 'createdBy',
    sourceKey: 'username',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
  

Account.belongsTo(EmployeeProfile, {
    foreignKey: 'username',
    targetKey: 'profileCode',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
  

Account.hasMany(PaymentReceipt, {
    foreignKey: 'createBy',
    sourceKey: 'username',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});