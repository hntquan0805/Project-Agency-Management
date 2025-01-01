const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


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

const { DeliveryNote } = require('./deliverynote');
const { EmployeeProfile } = require('./employeeprofile');
const { PaymentReceipt } = require('./paymentreceipt');

Account.hasMany(DeliveryNote, {
    foreignKey: 'createdBy',
    sourceKey: 'username',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  

Account.belongsTo(EmployeeProfile, {
    foreignKey: 'username',
    targetKey: 'profileCode',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  

Account.hasMany(PaymentReceipt, {
    foreignKey: 'createdBy',
    sourceKey: 'username',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});