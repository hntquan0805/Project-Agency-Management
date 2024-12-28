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
        type: DataTypes.STRING, // Mật khẩu
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
    foreignKey: 'createBy',
    sourceKey: 'username',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
  
  // Thiết lập mối quan hệ với EmployeeProfile
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